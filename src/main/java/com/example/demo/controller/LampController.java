/*package com.example.demo.controller;

import com.example.demo.exception.BadRequestException;
import com.example.demo.service.LampService;

import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.web.bind.annotation.*;

import java.io.IOException;

@RestController
@RequestMapping("/api/lampor")
public class LampController {
    private final LampService lampService;
    @Autowired
    public LampController(LampService lampService) {
        this.lampService = lampService;
    }
    @PostMapping("/toggle/{lampId}")
    public void toggleLamp(@PathVariable String lampId, @RequestBody boolean status) throws BadRequestException, IOException {
        lampService.lightsOnOff(lampId,status);
    }
}
*/