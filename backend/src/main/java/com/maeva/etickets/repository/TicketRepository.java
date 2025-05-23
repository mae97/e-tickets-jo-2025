package com.maeva.etickets.repository;

import com.maeva.etickets.entity.Ticket;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface TicketRepository extends JpaRepository<Ticket, Long> {
       List<Ticket> findByClientRef(String clientRef); 
}
