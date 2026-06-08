package com.example.demo.controller;

import com.example.demo.config.JwtUtil;
import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    // REGISTER
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody User user) {
        userRepository.save(user);
        return ResponseEntity.ok("User Registered Successfully");
    }

    // LOGIN
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody User user) {

        Optional<User> dbUser = userRepository.findByEmail(user.getEmail());

        if (dbUser.isPresent()) {

            User existingUser = dbUser.get();

            if (existingUser.getPassword() != null &&
                existingUser.getPassword().trim().equals(user.getPassword().trim())) {

                String token = JwtUtil.generateToken(existingUser.getEmail());

                return ResponseEntity.ok(token);
            }
        }

        return ResponseEntity.status(401).body("Invalid Credentials");
    }
}