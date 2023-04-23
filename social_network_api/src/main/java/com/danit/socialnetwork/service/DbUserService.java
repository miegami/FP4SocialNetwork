package com.danit.socialnetwork.service;

import com.danit.socialnetwork.model.DbUser;
import com.danit.socialnetwork.repository.DbUserRepo;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class DbUserService {

  private final DbUserRepo DbUserRepo;
  private final PasswordEncoder enc;

  public List findAll() {
    return DbUserRepo.findAll();
  }

  public Optional<DbUser> findByUsername(String username) {
    return DbUserRepo.findByUsername(username);
  }

  public DbUser saveUser(DbUser dbUser) {
    return DbUserRepo.save((new DbUser(
        dbUser.getUsername(),
        enc.encode(dbUser.getPassword()),
        dbUser.getEmail(),
        dbUser.getName())));
  }
}

