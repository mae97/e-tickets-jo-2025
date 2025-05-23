package com.maeva.etickets.entity;

import jakarta.persistence.*;

@Entity
public class Ticket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String clientRef; 
    private String purchaseKey;
    private String qrCode;

    public Ticket() {}

    // Get et Set

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getClientRef() {
        return clientRef;
    }

    public void setClientRef(String clientRef) {
        this.clientRef = clientRef;
    }

    public String getPurchaseKey() {
        return purchaseKey;
    }

    public void setPurchaseKey(String purchaseKey) {
        this.purchaseKey = purchaseKey;
    }

    public String getQrCode() {
        return qrCode;
    }

    public void setQrCode(String qrCode) {
        this.qrCode = qrCode;
    }
}
