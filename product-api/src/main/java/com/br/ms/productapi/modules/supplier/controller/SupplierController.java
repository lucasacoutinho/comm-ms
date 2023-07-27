package com.br.ms.productapi.modules.supplier.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.br.ms.productapi.modules.supplier.dto.SupplierRequest;
import com.br.ms.productapi.modules.supplier.dto.SupplierResponse;
import com.br.ms.productapi.modules.supplier.service.SupplierService;

@RestController
@RequestMapping("/api/supplier")
public class SupplierController {

    @Autowired
    private SupplierService supplierService;

    @GetMapping
    public List<SupplierResponse> findAll() {
        return this.supplierService.findAll();
    }

    @PostMapping
    public SupplierResponse store(@RequestBody SupplierRequest supplierRequest) {
        return this.supplierService.store(supplierRequest);
    }

    @GetMapping("{id}")
    public SupplierResponse findById(@PathVariable Integer id) {
        return this.supplierService.findByIdResponse(id);
    }

    @GetMapping("name/{name}")
    public List<SupplierResponse> findByName(@PathVariable String name) {
        return this.supplierService.findByName(name);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        this.supplierService.delete(id);
    }
}
