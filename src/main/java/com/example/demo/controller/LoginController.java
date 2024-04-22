package com.example.demo.controller;

import jakarta.servlet.http.HttpServletResponse;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;


@Controller
public class LoginController {

    @GetMapping("/api/llllllogin")
    public String showLoginPage(HttpServletResponse response) {
        // Ange HTTP-header för att förhindra webbläsaren från att spara inloggningsuppgifter
        response.setHeader("Cache-Control", "no-store");
        return "login";
    }
}
