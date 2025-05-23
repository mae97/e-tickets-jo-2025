package com.maeva.etickets.dto;

import java.util.List;

public class TicketForm {
    private String email;
    private List<String> offres;

    public String getEmail() {
         return email;
    }

     public void setEmail(String email) {
        this.email = email;
    }

    public List<String> getOffres() {
        return offres;
    }

      public void setOffres(List<String> offres) {
        this.offres = offres;
    }
}
