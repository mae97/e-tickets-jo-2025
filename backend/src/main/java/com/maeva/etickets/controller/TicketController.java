package com.maeva.etickets.controller;

import com.maeva.etickets.dto.TicketAdminDTO;
import com.maeva.etickets.dto.TicketForm;
import com.maeva.etickets.entity.Ticket;
import com.maeva.etickets.entity.User;
import com.maeva.etickets.repository.TicketRepository;
import com.maeva.etickets.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    @Autowired
    private TicketRepository ticketRepository;

    @Autowired
    private UserRepository userRepository;

    // Enregistrement des tickets (commande)
    @PostMapping("/purchase")
    public ResponseEntity<String> purchase(@RequestBody TicketForm form) {
        if (form.getEmail() == null || form.getOffres() == null || form.getOffres().isEmpty()) {
            return ResponseEntity.badRequest().body("Données manquantes.");
        }

        String email = form.getEmail();
        String clientRef = userRepository.findByEmail(email)
                .map(User::getClientRef)  
                .orElse(UUID.randomUUID().toString());

        for (String offre : form.getOffres()) {
            String purchaseKey = UUID.randomUUID().toString();

            Ticket ticket = new Ticket();
            ticket.setClientRef(email); // stocke l’email ou un identifiant
            ticket.setPurchaseKey(purchaseKey);
            ticket.setQrCode(clientRef + "-" + purchaseKey);

            ticketRepository.save(ticket);
        }

        return ResponseEntity.ok("Tickets enregistrés !");
    }

    // Tickets d'un utilisateur
    @GetMapping("/by-user")
    public List<Ticket> getTicketsByUser(@RequestParam String email) {
        return ticketRepository.findByClientRef(email); 
    }

    // Tous les tickets pour l’admin
    @GetMapping("/all")
    public List<TicketAdminDTO> getAllTickets() {
        return ticketRepository.findAll()
                .stream()
                .map(t -> new TicketAdminDTO(
                        t.getId(),
                        t.getClientRef(),
                        t.getPurchaseKey(),
                        t.getQrCode()))
                .toList();
    }

    // Suppression
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTicket(@PathVariable Long id) {
        if (!ticketRepository.existsById(id)) {
            return ResponseEntity.notFound().build();
        }

        ticketRepository.deleteById(id);
        return ResponseEntity.ok("Ticket supprimé !");
    }
}
