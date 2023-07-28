package com.br.ms.productapi.modules.category.service;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.util.ObjectUtils;

import com.br.ms.productapi.config.exception.ValidationException;
import com.br.ms.productapi.modules.category.dto.CategoryRequest;
import com.br.ms.productapi.modules.category.dto.CategoryResponse;
import com.br.ms.productapi.modules.category.model.Category;
import com.br.ms.productapi.modules.category.repository.CategoryRepository;
import com.br.ms.productapi.modules.product.service.ProductService;

@Service
public class CategoryService {

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private ProductService productService;

    public List<CategoryResponse> findAll() {
        return this.categoryRepository
                .findAll()
                .stream()
                .map(CategoryResponse::of)
                .collect(Collectors.toList());
    }

    public CategoryResponse store(CategoryRequest categoryRequest) {
        this.validateCategoryNameInformed(categoryRequest);
        var category = this.categoryRepository.save(Category.of(categoryRequest));
        return CategoryResponse.of(category);
    }

    public CategoryResponse findByIdResponse(Integer id) {
        if (ObjectUtils.isEmpty(id)) {
            throw new ValidationException("Category id is required");
        }

        return CategoryResponse.of(this.findById(id));
    }

    public List<CategoryResponse> findByDescription(String description) {
        if (ObjectUtils.isEmpty(description)) {
            throw new ValidationException("Category description is required");
        }

        return this.categoryRepository
                .findByDescriptionIgnoreCaseContaining(description)
                .stream()
                .map(CategoryResponse::of)
                .collect(Collectors.toList());
    }

    public Category findById(Integer id) {
        return this.categoryRepository
                .findById(id)
                .orElseThrow(() -> new ValidationException("Category not found"));
    }

    public CategoryResponse update(Integer id, CategoryRequest categoryRequest) {
        if (ObjectUtils.isEmpty(id)) {
            throw new ValidationException("Category id is required");
        }

        this.validateCategoryNameInformed(categoryRequest);

        var category = Category.of(categoryRequest);
        category.setId(id);
        this.categoryRepository.save(category);
        return CategoryResponse.of(category);
    }

    public void delete(Integer id) {
        if (ObjectUtils.isEmpty(id)) {
            throw new ValidationException("Category id is required");
        }

        if (this.productService.existsByCategoryId(id)) {
            throw new ValidationException("Category is associated with a product");
        }

        this.categoryRepository.deleteById(id);
    }

    private void validateCategoryNameInformed(CategoryRequest categoryRequest) {
        if (ObjectUtils.isEmpty(categoryRequest.getDescription())) {
            throw new ValidationException("Category description is required");
        }
    }
}
