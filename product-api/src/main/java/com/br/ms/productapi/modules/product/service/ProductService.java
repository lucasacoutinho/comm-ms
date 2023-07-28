package com.br.ms.productapi.modules.product.service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.ObjectUtils;

import com.br.ms.productapi.config.exception.ValidationException;
import com.br.ms.productapi.modules.category.service.CategoryService;
import com.br.ms.productapi.modules.product.dto.ProductCheckStockRequest;
import com.br.ms.productapi.modules.product.dto.ProductQuantityDTO;
import com.br.ms.productapi.modules.product.dto.ProductRequest;
import com.br.ms.productapi.modules.product.dto.ProductResponse;
import com.br.ms.productapi.modules.product.dto.ProductSalesResponse;
import com.br.ms.productapi.modules.product.dto.ProductStockDTO;
import com.br.ms.productapi.modules.product.model.Product;
import com.br.ms.productapi.modules.product.repository.ProductRepository;
import com.br.ms.productapi.modules.sales.client.SalesClient;
import com.br.ms.productapi.modules.sales.dto.SalesConfirmationDTO;
import com.br.ms.productapi.modules.sales.enums.SalesStatus;
import com.br.ms.productapi.modules.sales.rabbitmq.SalesConfirmationSender;
import com.br.ms.productapi.modules.supplier.service.SupplierService;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class ProductService {

    private static final Integer MINIMUM_QUANTITY = 0;

    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private SupplierService supplierService;
    @Autowired
    private SalesConfirmationSender salesConfirmationSender;
    @Autowired
    private SalesClient salesClient;

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

    public ProductResponse update(Integer id, ProductRequest productRequest) {
        this.validateProductDataInformed(productRequest);
        this.validateCategoryAndSupplierIdInformed(productRequest);

        var category = this.categoryService.findById(productRequest.getCategoryId());
        var supplier = this.supplierService.findById(productRequest.getSupplierId());

        var product = Product.of(productRequest, category, supplier);
        product.setId(id);
        this.productRepository.save(product);

        return ProductResponse.of(product);
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

    private void validateStockUpdateData(ProductStockDTO product) {
        if (ObjectUtils.isEmpty(product) || ObjectUtils.isEmpty(product.getSalesId())) {
            throw new ValidationException("The product data or sales ID is required");
        }

        if (ObjectUtils.isEmpty(product.getProducts())) {
            throw new ValidationException("The sales products must be informed");
        }

        product.getProducts().forEach(salesProduct -> {
            if (ObjectUtils.isEmpty(salesProduct.getQuantity()) || ObjectUtils.isEmpty(salesProduct.getProductId())) {
                throw new ValidationException("The product id and the quantity must be informed");
            }
        });
    }

    @Transactional
    public void updateProductStock(ProductStockDTO product) {
        try {
            validateStockUpdateData(product);
            updateStock(product);

        } catch (Exception e) {
            log.error("Error while trying to update product stock: {}", e.getMessage());
            var message = new SalesConfirmationDTO(product.getSalesId(), SalesStatus.REJECTED);
            salesConfirmationSender.sendSalesConfirmationMessage(message);
        }
    }

    private void validateQuantityInStock(ProductQuantityDTO salesProduct, Product existingProduct) {
        if (salesProduct.getQuantity() > existingProduct.getQuantity()) {
            throw new ValidationException(
                    String.format("The product %s is out of stock", existingProduct.getId()));
        }
    }

    private void updateStock(ProductStockDTO product) {
        var productsForUpdate = new ArrayList<Product>();

        product
                .getProducts()
                .forEach(salesProduct -> {
                    var existingProduct = findById(salesProduct.getProductId());

                    validateQuantityInStock(salesProduct, existingProduct);

                    existingProduct.removeStock(salesProduct.getQuantity());
                    productsForUpdate.add(existingProduct);
                });

        if (productsForUpdate.isEmpty()) {
            return;
        }

        productRepository.saveAll(productsForUpdate);

        var message = new SalesConfirmationDTO(product.getSalesId(), SalesStatus.APPROVED);
        salesConfirmationSender.sendSalesConfirmationMessage(message);
    }

    private void validateStock(ProductQuantityDTO productQuantity) {
        if (ObjectUtils.isEmpty(productQuantity.getProductId()) || ObjectUtils.isEmpty(productQuantity.getQuantity())) {
            throw new ValidationException("The product id and the quantity must be informed");
        }

        var product = findById(productQuantity.getProductId());
        if (productQuantity.getQuantity() > product.getQuantity()) {
            throw new ValidationException(String.format("The product %s is out of stock", product.getId()));
        }
    }

    public void checkProductsStock(ProductCheckStockRequest request) {
        if (ObjectUtils.isEmpty(request) || ObjectUtils.isEmpty(request.getProducts())) {
            throw new ValidationException("The products must be informed");
        }

        request
                .getProducts()
                .forEach(this::validateStock);
    }

    public ProductSalesResponse findSalesByProductId(Integer id) {
        var product = findById(id);

        try {
            var sales = salesClient
                    .findSalesByProductId(id)
                    .orElseThrow(() -> new ValidationException("Sales not found"));

            return ProductSalesResponse.of(product, sales.getSalesIds());
        } catch (Exception e) {
            throw new ValidationException("Error while trying to find sales by product ID");
        }
    }
}
