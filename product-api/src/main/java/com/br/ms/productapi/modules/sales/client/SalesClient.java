package com.br.ms.productapi.modules.sales.client;

import java.util.Optional;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.br.ms.productapi.modules.sales.dto.SalesProductResponse;

@FeignClient(name = "salesClient", contextId = "salesClient", url = "${app-config.services.sales}")
public interface SalesClient {
    @GetMapping("/api/order/product/{productId}")
    Optional<SalesProductResponse> findSalesByProductId(@PathVariable Integer productId);
}
