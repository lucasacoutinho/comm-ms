package com.br.ms.productapi.modules.category.controller;

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

import com.br.ms.productapi.modules.category.dto.CategoryRequest;
import com.br.ms.productapi.modules.category.dto.CategoryResponse;
import com.br.ms.productapi.modules.category.service.CategoryService;

@RestController
@RequestMapping("/api/category")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping
    public List<CategoryResponse> findAll() {
        return this.categoryService.findAll();
    }

    @PostMapping
    public CategoryResponse store(@RequestBody CategoryRequest categoryRequest) {
        return this.categoryService.store(categoryRequest);
    }

    @GetMapping("{id}")
    public CategoryResponse findById(@PathVariable Integer id) {
        return this.categoryService.findByIdResponse(id);
    }

    @GetMapping("description/{description}")
    public List<CategoryResponse> findById(@PathVariable String description) {
        return this.categoryService.findByDescription(description);
    }

    @PutMapping("{id}")
    public CategoryResponse update(@PathVariable Integer id, @RequestBody CategoryRequest categoryRequest) {
        return this.categoryService.update(id, categoryRequest);
    }

    @DeleteMapping("{id}")
    @ResponseStatus(code = HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Integer id) {
        this.categoryService.delete(id);
    }
}
