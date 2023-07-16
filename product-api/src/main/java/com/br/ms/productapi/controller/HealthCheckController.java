package com.br.ms.productapi.controller;

import java.util.HashMap;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class HealthCheckController {

        @GetMapping("health-check")
        public ResponseEntity<HashMap<String, Object>> getHealthCheck() {
            var response = new HashMap<String, Object>();

            response.put("status", "OK");

            return ResponseEntity.ok(response);
        }
}
