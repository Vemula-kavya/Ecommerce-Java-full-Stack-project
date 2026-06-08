package com.example.demo.controller;

import com.example.demo.entity.Product;
import com.example.demo.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin
public class ProductController {

    @Autowired
    private ProductRepository repo;

    // ADD PRODUCT
    @PostMapping("/add")
    public Product addProduct(@RequestBody Product product) {
        return repo.save(product);
    }

    // GET PRODUCTS
    @GetMapping
    public List<Product> getProducts() {
        return repo.findAll();
    }
}