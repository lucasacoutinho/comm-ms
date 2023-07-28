package com.br.ms.productapi.modules.product.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.br.ms.productapi.modules.product.dto.ProductCheckStockRequest;
import com.br.ms.productapi.modules.product.dto.ProductRequest;
import com.br.ms.productapi.modules.product.dto.ProductResponse;
import com.br.ms.productapi.modules.product.dto.ProductSalesResponse;
import com.br.ms.productapi.modules.product.service.ProductService;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping
    public List<ProductResponse> findAll() {
        return productService.findAll();
    }

    @PostMapping
    public ProductResponse store(@RequestBody ProductRequest productRequest) {
        return productService.store(productRequest);
    }

    @GetMapping("{id}")
    public ProductResponse findById(@PathVariable Integer id) {
        return productService.findByIdResponse(id);
    }

    @GetMapping("name/{name}")
    public List<ProductResponse> findByName(@PathVariable String name) {
        return productService.findByName(name);
    }

    @GetMapping("category/{categoryId}")
    public List<ProductResponse> findByCategoryId(@PathVariable Integer categoryId) {
        return productService.findByCategoryId(categoryId);
    }

    @GetMapping("supplier/{supplierId}")
    public List<ProductResponse> findBySupplierId(@PathVariable Integer supplierId) {
        return productService.findBySupplierId(supplierId);
    }

    @PutMapping("{id}")
    public ProductResponse update(@PathVariable Integer id, @RequestBody ProductRequest productRequest) {
        return productService.update(id, productRequest);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        productService.delete(id);
    }

    @PostMapping("check-stock")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void checkStock(@RequestBody ProductCheckStockRequest productCheckStockRequest) {
        productService.checkProductsStock(productCheckStockRequest);
    }

    @GetMapping("{productId}/sales")
    public ProductSalesResponse findSalesByProductId(@PathVariable Integer productId) {
        return productService.findSalesByProductId(productId);
    }
}
