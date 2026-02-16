package com.example.web.controllers;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("")
public class WebController {
    @GetMapping("/")
    public String getIndex() {
        return "index";
    }
    @GetMapping("/about")
    public String getAbout() {
        return "about";
    }
    @GetMapping("/checkout")
    public String getCheckout() {
        return "checkout";
    }
}
