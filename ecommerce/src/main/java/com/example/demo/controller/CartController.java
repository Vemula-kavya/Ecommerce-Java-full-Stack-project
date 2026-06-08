package com.example.demo.controller;

import com.example.demo.entity.Cart;
import com.example.demo.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin
public class CartController {

    @Autowired
    private CartRepository repo;

    // ADD TO CART
    @PostMapping("/add")
    public Cart addToCart(@RequestBody Cart cart) {
        return repo.save(cart);
    }

    // GET CART ITEMS
    @GetMapping
    public List<Cart> getCart() {
        return repo.findAll();
    }

    // DELETE ITEM
    @DeleteMapping("/{id}")
    public String deleteItem(@PathVariable Long id) {
        repo.deleteById(id);
        return "Deleted successfully";
    }
}