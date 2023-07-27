package com.br.ms.productapi.modules.supplier.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.br.ms.productapi.config.exception.ValidationException;
import com.br.ms.productapi.modules.product.service.ProductService;
import com.br.ms.productapi.modules.supplier.dto.SupplierRequest;
import com.br.ms.productapi.modules.supplier.dto.SupplierResponse;
import com.br.ms.productapi.modules.supplier.model.Supplier;
import com.br.ms.productapi.modules.supplier.repository.SupplierRepository;

@Service
public class SupplierService {

    @Autowired
    private SupplierRepository supplierRepository;

    @Autowired
    private ProductService productService;

    public List<SupplierResponse> findAll() {
        return this.supplierRepository
                .findAll()
                .stream()
                .map(SupplierResponse::of)
                .collect(Collectors.toList());
    }

    public SupplierResponse store(SupplierRequest supplierRequest) {
        this.validateSupplierNameInformed(supplierRequest);
        var category = this.supplierRepository.save(Supplier.of(supplierRequest));
        return SupplierResponse.of(category);
    }

    public List<SupplierResponse> findByName(String name) {
        if (ObjectUtils.isEmpty(name)) {
            throw new ValidationException("Supplier name is required");
        }

        return this.supplierRepository
                .findByNameIgnoreCaseContaining(name)
                .stream()
                .map(SupplierResponse::of)
                .collect(Collectors.toList());
    }

    public SupplierResponse findByIdResponse(Integer id) {
        if (ObjectUtils.isEmpty(id)) {
            throw new ValidationException("Supplier id is required");
        }

        return SupplierResponse.of(this.findById(id));
    }

    public Supplier findById(Integer id) {
        return this.supplierRepository
                .findById(id)
                .orElseThrow(() -> new ValidationException("Supplier not found"));
    }

    public void delete(Integer id) {
        if (ObjectUtils.isEmpty(id)) {
            throw new ValidationException("Supplier id is required");
        }

        if (this.productService.existsBySupplierId(id)) {
            throw new ValidationException("Supplier has products associated");
        }

        this.supplierRepository.deleteById(id);
    }

    private void validateSupplierNameInformed(SupplierRequest supplierRequest) {
        if (ObjectUtils.isEmpty(supplierRequest.getName())) {
            throw new ValidationException("Supplier name is required");
        }
    }
}
