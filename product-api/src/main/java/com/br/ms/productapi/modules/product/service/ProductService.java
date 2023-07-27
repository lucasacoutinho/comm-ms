package com.br.ms.productapi.modules.product.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.br.ms.productapi.config.exception.ValidationException;
import com.br.ms.productapi.modules.category.service.CategoryService;
import com.br.ms.productapi.modules.product.dto.ProductRequest;
import com.br.ms.productapi.modules.product.dto.ProductResponse;
import com.br.ms.productapi.modules.product.model.Product;
import com.br.ms.productapi.modules.product.repository.ProductRepository;
import com.br.ms.productapi.modules.supplier.service.SupplierService;

@Service
public class ProductService {

    private static final Integer MINIMUM_QUANTITY = 0;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private SupplierService supplierService;

    public List<ProductResponse> findAll() {
        return this.productRepository
                .findAll()
                .stream()
                .map(ProductResponse::of)
                .collect(Collectors.toList());
    }

    public ProductResponse store(ProductRequest productRequest) {
        this.validateProductDataInformed(productRequest);
        this.validateCategoryAndSupplierIdInformed(productRequest);

        var category = this.categoryService.findById(productRequest.getCategoryId());
        var supplier = this.supplierService.findById(productRequest.getSupplierId());

        var product = this.productRepository.save(Product.of(productRequest, category, supplier));

        return ProductResponse.of(product);
    }

    public ProductResponse findByIdResponse(Integer id) {
        if (ObjectUtils.isEmpty(id)) {
            throw new ValidationException("Product ID is required");
        }

        return ProductResponse.of(this.findById(id));
    }

    public Product findById(Integer id) {
        return this.productRepository.findById(id)
                .orElseThrow(() -> new ValidationException("Product not found"));
    }

    public List<ProductResponse> findByName(String name) {
        if (ObjectUtils.isEmpty(name)) {
            throw new ValidationException("Product name is required");
        }

        return this.productRepository
                .findByNameIgnoreCaseContaining(name)
                .stream()
                .map(ProductResponse::of)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> findBySupplierId(Integer supplierId) {
        if (ObjectUtils.isEmpty(supplierId)) {
            throw new ValidationException("Supplier ID is required");
        }

        return this.productRepository
                .findBySupplierId(supplierId)
                .stream()
                .map(ProductResponse::of)
                .collect(Collectors.toList());
    }

    public List<ProductResponse> findByCategoryId(Integer categoryId) {
        if (ObjectUtils.isEmpty(categoryId)) {
            throw new ValidationException("Category ID is required");
        }

        return this.productRepository
                .findByCategoryId(categoryId)
                .stream()
                .map(ProductResponse::of)
                .collect(Collectors.toList());
    }

    public Boolean existsByCategoryId(Integer categoryId) {
        return this.productRepository.existsByCategoryId(categoryId);
    }

    public Boolean existsBySupplierId(Integer supplierId) {
        return this.productRepository.existsBySupplierId(supplierId);
    }

    public void delete(Integer id) {
        if (ObjectUtils.isEmpty(id)) {
            throw new ValidationException("Product ID is required");
        }

        this.productRepository.deleteById(id);
    }

    private void validateProductDataInformed(ProductRequest productRequest) {
        if (ObjectUtils.isEmpty(productRequest.getName())) {
            throw new ValidationException("Product name is required");
        }
        if (ObjectUtils.isEmpty(productRequest.getQuantity())) {
            throw new ValidationException("Product quantity is required");
        }
        if (productRequest.getQuantity() <= MINIMUM_QUANTITY) {
            throw new ValidationException("Product quantity must be greater than 0");
        }
    }

    private void validateCategoryAndSupplierIdInformed(ProductRequest productRequest) {
        if (ObjectUtils.isEmpty(productRequest.getCategoryId())) {
            throw new ValidationException("Category ID is required");
        }
        if (ObjectUtils.isEmpty(productRequest.getSupplierId())) {
            throw new ValidationException("Supplier ID is required");
        }
    }
}
