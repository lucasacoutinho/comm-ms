package com.br.ms.productapi.modules.product.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProductQuantityDTO {

    @JsonProperty("product_id")
    private Integer productId;
    private Integer quantity;
}
