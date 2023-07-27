package com.br.ms.productapi.modules.product.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class ProductRequest {
    private String name;
    private Integer quantity;
    @JsonProperty("supplier_id")
    private Integer supplierId;
    @JsonProperty("category_id")
    private Integer categoryId;
}
