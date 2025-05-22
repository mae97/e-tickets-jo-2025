package com.maeva.etickets.controller;

import com.maeva.etickets.entity.Offer;
import com.maeva.etickets.repository.OfferRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/offers")
public class OfferController {

    @Autowired
    private OfferRepository offerRepository;

    //  Lire toute les offre
    @GetMapping
    public List<Offer> getAllOffers() {
        return offerRepository.findAll();
    }

    //  Ajouté une nouvelle offre
    @PostMapping
    public ResponseEntity<String> createOffer(@RequestBody Offer offer) {
        offerRepository.save(offer);
        return ResponseEntity.ok("Offre créée !");
    }

    //  Modifier une offre 
    @PutMapping("/{id}")
    public ResponseEntity<String> updateOffer(@PathVariable Long id, @RequestBody Offer updated) {
        return offerRepository.findById(id).map(offer -> {
            offer.setName(updated.getName());
            offer.setPrice(updated.getPrice());
            offer.setQuantity(updated.getQuantity());
            offerRepository.save(offer);
            return ResponseEntity.ok("Offre modifiée !");
        }).orElse(ResponseEntity.notFound().build());
    }

    //  Supprimer une offre
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteOffer(@PathVariable Long id) {
        if (!offerRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }
        offerRepository.deleteById(id);
        return ResponseEntity.ok("Offre supprimée !");
    }
}
