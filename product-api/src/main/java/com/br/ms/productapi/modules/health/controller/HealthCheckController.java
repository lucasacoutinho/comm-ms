package com.br.ms.productapi.modules.health.controller;

import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/health-check")
public class HealthCheckController {
    @GetMapping
    public ResponseEntity<HashMap<String, Object>> getHealthCheck() {
        var response = new HashMap<String, Object>();

        response.put("status", "OK");

        return ResponseEntity.ok(response);
    }
}
