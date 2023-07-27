package com.br.ms.productapi.modules.product.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.ms.productapi.modules.product.model.Product;
import java.util.List;

public interface ProductRepository extends JpaRepository<Product, Integer> {

    List<Product> findByNameIgnoreCaseContaining(String name);

    List<Product> findByCategoryId(Integer id);

    List<Product> findBySupplierId(Integer id);

    Boolean existsByCategoryId(Integer id);

    Boolean existsBySupplierId(Integer id);
}
