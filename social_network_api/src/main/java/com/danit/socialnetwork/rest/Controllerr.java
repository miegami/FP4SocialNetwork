package com.danit.socialnetwork.rest;

import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.Collections;
import java.util.Map;

@Controller
public class Controllerr {
    @RequestMapping(value = "/out", method = RequestMethod.GET)
    public String home() {
        System.out.println("OUT");
        return "home";
    }
    @RequestMapping(value = "/index", method = RequestMethod.GET)
    public String index() {
        System.out.println("INDEX");

        return "index";
    }
//    @ResponseBody
    @GetMapping(value = "/user")
//    @RequestMapping(value = "/user", method = RequestMethod.GET)
    public Map<String, Object> user(@AuthenticationPrincipal OAuth2User principal) {
        System.out.println("USERRR");
        return Collections.singletonMap("userData", principal.getAttribute("name"));
    }
}
