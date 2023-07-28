package com.br.ms.productapi.modules.product.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductStockDTO {

    @JsonProperty("sales_id")
    private String salesId;
    private List<ProductQuantityDTO> products;
}
