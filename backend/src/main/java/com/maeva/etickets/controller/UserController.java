package com.maeva.etickets.controller;

import com.maeva.etickets.dto.UserForm;
import com.maeva.etickets.entity.User;
import com.maeva.etickets.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // Inscription utilisateur
    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody UserForm form) {
        if (userRepository.findByEmail(form.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Un compte existe déjà avec cet email.");
        }

        User user = new User();
        user.setFirstName(form.getFirstName());
        user.setLastName(form.getLastName());
        user.setEmail(form.getEmail());
        user.setPassword(passwordEncoder.encode(form.getPassword()));
        user.setClientRef(UUID.randomUUID().toString()); // ici on utilise clientRef
        user.setAdmin(false);

        userRepository.save(user);

        return ResponseEntity.ok("Utilisateur enregistré avec succès !");
    }

    // Connexion utilisateur
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody UserForm form) {
        return userRepository.findByEmail(form.getEmail())
                .map(user -> {
                    if (passwordEncoder.matches(form.getPassword(), user.getPassword())) {
                        return ResponseEntity.ok(user.isAdmin() ? "admin" : "user");
                    } else {
                        return ResponseEntity.badRequest().body("Mot de passe incorrect.");
                    }
                })
                .orElse(ResponseEntity.badRequest().body("Aucun compte associé à cet email."));
    }

    // Liste des utilisateurs
    @GetMapping("/all")
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    // Suppression d'un utilisateur
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return ResponseEntity.ok("Utilisateur supprimé !");
    }

    // Modification d'un utilisateur
    @PutMapping("/{id}")
    public ResponseEntity<String> updateUser(@PathVariable Long id, @RequestBody UserForm form) {
        return userRepository.findById(id).map(user -> {
            user.setFirstName(form.getFirstName());
            user.setLastName(form.getLastName());
            user.setAdmin(form.isAdmin());

            if (form.getPassword() != null && !form.getPassword().isBlank()) {
                user.setPassword(passwordEncoder.encode(form.getPassword()));
            }

            userRepository.save(user);
            return ResponseEntity.ok("Utilisateur modifié !");
        }).orElse(ResponseEntity.notFound().build());
    }
}
