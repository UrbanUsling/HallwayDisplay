package com.example.demo.controller;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class LogoutController {

    @GetMapping("/lllllogout")
    public String logout(HttpServletRequest request, HttpServletResponse response) {
        // Rensa sessionen
        HttpSession session = request.getSession(false);
        if (session != null) {
            session.invalidate();
        }
        // Omdirigera till startsidan eller inloggningssidan
        return "redirect:/login";
    }
}
