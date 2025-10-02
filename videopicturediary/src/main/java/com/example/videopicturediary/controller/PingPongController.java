package com.example.videopicturediary.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
@RequestMapping("/api")
public class PingPongController {

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}
