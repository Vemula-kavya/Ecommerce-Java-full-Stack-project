package com.example.demo.controller;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    @Autowired
    private UserRepository repo;

    // ADD USER
    @PostMapping("/add")
    public User addUser(@RequestBody User user) {
        return repo.save(user);
    }

    // GET USERS
    @GetMapping
    public List<User> getUsers() {
        return repo.findAll();
    }
}