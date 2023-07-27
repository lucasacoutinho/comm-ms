package com.br.ms.productapi.modules.supplier.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.ms.productapi.modules.supplier.model.Supplier;

public interface SupplierRepository extends JpaRepository<Supplier, Integer> {

    List<Supplier> findByNameIgnoreCaseContaining(String name);
}
