package com.danit.socialnetwork.service;

import com.danit.socialnetwork.controller.PasswordChanger;
import com.danit.socialnetwork.dto.ChangePasswordRequest;
import com.danit.socialnetwork.dto.CodeCheckRequest;
import com.danit.socialnetwork.dto.NewPasswordRequest;
import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.model.PasswordChangeRequests;
import com.danit.socialnetwork.repository.PasswordChangeRequestsRepo;
import com.danit.socialnetwork.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.log4j.Log4j2;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@Log4j2
@Service
@RequiredArgsConstructor
public class PasswordChangerServiceImpl implements PasswordChangerService {
  private final PasswordChangeRequestsRepo passwordChangeRequestsRepo;
  private final UserRepository userRepo;
  private final PasswordChanger passChanger = new PasswordChanger();


  public String saveRequest(String email, String request) {
    PasswordChangeRequests pcr = new PasswordChangeRequests();
    pcr.setEmail(email);
    pcr.setChangeRequest(request);
    passwordChangeRequestsRepo.save(pcr);
    return "request to change password from " + email;
  }

  public ResponseEntity<?> changePassword(@RequestBody ChangePasswordRequest changePasswordRequest) {
    String userEmail = changePasswordRequest.getEmail();
    Optional<DbUser> maybeUser = userRepo.findDbUserByEmail(userEmail);
    Map<String, String> response = new HashMap<>();
    if (maybeUser.isPresent()) {
      String secretUrl = passChanger.change(userEmail);
      log.info(saveRequest(userEmail, secretUrl));
      response.put("email", userEmail);
      response.put("message", "Instructions sent on, " + userEmail);
      return ResponseEntity.ok(response);
    } else {
      response.put("email", userEmail);
      response.put("message", "User with email " + userEmail + " is not registered");
      return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }
  }

  public Optional<PasswordChangeRequests> getEmailByUuid(String uuid) {
    return passwordChangeRequestsRepo.getPasswordChangeRequestsByChangeRequest(uuid);
  }

  public void deleteRequestByEmail(String email) {
    passwordChangeRequestsRepo.deleteById(email);
  }

  public ResponseEntity<?> codeCheck(@RequestBody CodeCheckRequest codeCheckRequest) {
    String userEmail = codeCheckRequest.getEmail();
    String secretCode = codeCheckRequest.getCode();
    Optional<PasswordChangeRequests> maybeRequest = getEmailByUuid(secretCode);
    Map<String, String> response = new HashMap<>();
    if (maybeRequest.isPresent()) {
      String email = maybeRequest.get().getEmail();
      if (email.equals(userEmail)) {
        log.info("Change password page call from e-mail " + email);
        deleteRequestByEmail(maybeRequest.get().getEmail());
        response.put("email", userEmail);
        response.put("message", "code accessed");
        return ResponseEntity.ok(response);
      }
    }
    log.info("Invalid code from codeCheckRequest");
    response.put("email", userEmail);
    response.put("message", "Invalid code");
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }

  public boolean changedPassword(String email, String password) {
    Optional<DbUser> maybeUser = userRepo.findDbUserByEmail(email);
    if (maybeUser.isPresent()) {
      DbUser refreshUser = maybeUser.get();
      refreshUser.setPassword(password);
      userRepo.save(refreshUser);
      return true;
    } else {
      return false;
    }
  }

  public ResponseEntity<?> authenticateUser(@RequestBody NewPasswordRequest newPasswordRequest) {
    String userEmail = newPasswordRequest.getEmail();
    String password = newPasswordRequest.getPassword();

    Optional<DbUser> maybeUser = userRepo.findDbUserByEmail(userEmail);
    Map<String, String> response = new HashMap<>();

    if (maybeUser.isPresent()) {
      BCryptPasswordEncoder bcenc = new BCryptPasswordEncoder();
      String encodedPass = bcenc.encode(password);
      if (changedPassword(userEmail, encodedPass)) {
        response.put("email", userEmail);
        response.put("message", "Password changed");
        return ResponseEntity.ok(response);
      }
    }
    response.put("email", userEmail);
    response.put("message", "User with email " + userEmail + " is not registered");
    return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
  }
}