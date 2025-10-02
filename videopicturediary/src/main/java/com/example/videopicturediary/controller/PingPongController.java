package com.example.videopicturediary.controller;

import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping;

@RestController
public class PingPongController {

    @GetMapping("/ping")
    public String ping() {
        return "pong";
    }
}
