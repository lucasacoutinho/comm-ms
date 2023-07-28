package com.br.ms.productapi.modules.product.rabbitmq;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import com.br.ms.productapi.modules.product.dto.ProductStockDTO;
import com.br.ms.productapi.modules.product.service.ProductService;

@Component
public class ProductStockListener {

    @Autowired
    private ProductService productService;

    @RabbitListener(queues = "${app-config.rabbit.queue.product-stock}")
    public void receiveProductStockMessage(ProductStockDTO product) {
        productService.updateProductStock(product);
    }
}
