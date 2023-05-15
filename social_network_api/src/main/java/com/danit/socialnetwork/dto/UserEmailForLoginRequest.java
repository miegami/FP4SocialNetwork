package com.danit.socialnetwork.dto;

import lombok.Data;
import lombok.extern.log4j.Log4j2;

@Log4j2
@Data
public class UserEmailForLoginRequest {
  private String email;
}