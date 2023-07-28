package com.br.ms.productapi.modules.sales.dto;

import com.br.ms.productapi.modules.sales.enums.SalesStatus;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SalesConfirmationDTO {

    @JsonProperty("sales_id")
    private String salesId;

    private SalesStatus status;
}
