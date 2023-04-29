package com.danit.socialnetwork.service;

import com.danit.socialnetwork.model.DbUser;

import java.io.IOException;
import java.util.Optional;

public interface UserService {

  byte[] getProfileImage(String username) throws IOException;

  byte[] getBackgroundImage(String username) throws IOException;

//  abstract DbUser findByUsernameO(String username);

  Optional<DbUser> findByUsername(String username);

  public boolean activateUser(Integer code);


  boolean save (DbUser dbUser);


  boolean sendLetter(String name, String email);

}