package com.br.ms.productapi.modules.category.model;

import org.springframework.beans.BeanUtils;

import com.br.ms.productapi.modules.category.dto.CategoryRequest;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "category")
public class Category {
    
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Integer id;

    @Column(name = "description", nullable = false)
    private String description;

    public static Category of(CategoryRequest categoryRequest) {
        var category = new Category();
        BeanUtils.copyProperties(categoryRequest, category);
        return category;
    }
}
