package com.br.ms.productapi.modules.jwt.dto;

import io.jsonwebtoken.Claims;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class JwtResponse {
    private Integer id;

    public static JwtResponse getUserId(Claims jwtClaims) {
        try {
            return JwtResponse
                    .builder()
                    .id((Integer) jwtClaims.get("id"))
                    .build();

        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }
}
