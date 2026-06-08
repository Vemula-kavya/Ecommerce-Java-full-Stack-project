package com.example.demo.controller;

import com.example.demo.entity.Orders;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "*")
public class OrderController {

    @Autowired
    private OrderRepository orderRepository;

    // ➤ Get all orders
    @GetMapping
    public List<Orders> getAllOrders() {
        return orderRepository.findAll();
    }

    // ➤ Create order
    @PostMapping
    public Orders createOrder(@RequestBody Orders order) {
        order.setStatus("PLACED");
        order.setOrderDate(LocalDateTime.now());
        return orderRepository.save(order);
    }

    // ➤ Get by ID
    @GetMapping("/{id}")
    public Orders getById(@PathVariable Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found"));
    }

    // ➤ Delete order
    @DeleteMapping("/{id}")
    public String deleteOrder(@PathVariable Long id) {
    	Orders order = orderRepository.findById(id)
    	        .orElseThrow(() -> new RuntimeException("Order not found"));

    	    orderRepository.delete(order);

    	    return "Deleted successfully";
    }
}