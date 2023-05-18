package com.danit.socialnetwork.exception.post;

public class PostNotFoundException extends AppPostError {
  public PostNotFoundException(String message) {
    super(message);
  }

  public PostNotFoundException(String message, Throwable cause) {
    super(message, cause);
  }

  public PostNotFoundException(Throwable cause) {
    super(cause);
  }
}
