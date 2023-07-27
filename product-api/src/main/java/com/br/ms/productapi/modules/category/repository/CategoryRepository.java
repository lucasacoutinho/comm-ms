package com.br.ms.productapi.modules.category.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.br.ms.productapi.modules.category.model.Category;
import java.util.List;

public interface CategoryRepository extends JpaRepository<Category, Integer> {
    
    List<Category> findByDescriptionIgnoreCaseContaining(String description);
}
