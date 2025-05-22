package com.maeva.etickets.dto;

public class TicketAdminDTO {
    private Long id;
    private String clientRef;
    private String purchaseKey;
    private String qrCode;

    public TicketAdminDTO(Long id, String clientRef, String purchaseKey, String qrCode) {
        this.id = id;
        this.clientRef = clientRef;
        this.purchaseKey = purchaseKey;
        this.qrCode = qrCode;
    }

    public Long getId() { return id; }
    public String getClientRef() { return clientRef; }
    public String getPurchaseKey() { return purchaseKey; }
    public String getQrCode() { return qrCode; }
}
