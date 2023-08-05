package com.br.ms.productapi.modules.sales.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SalesProductResponse {
    @JsonProperty("sales_ids")
    private List<String> salesIds;
}
