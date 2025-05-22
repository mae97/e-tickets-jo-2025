package com.maeva.etickets.repository;

import com.maeva.etickets.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

/**
 */
public interface UserRepository extends JpaRepository<User, Long> {

    /**
     *  Recherche un utilisateur par son adresse email
     * @param email adresse email unique
     * @return Optional<User> trouvé ou non
     */
    Optional<User> findByEmail(String email);
}
