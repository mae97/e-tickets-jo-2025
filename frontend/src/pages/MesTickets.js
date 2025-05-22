import React, { useEffect, useState } from "react";
import axios from "../axios"; 
import { QRCodeSVG } from "qrcode.react";

export default function MesTickets() {
  const [tickets, setTickets] = useState([]);
  const email = localStorage.getItem("email");

  useEffect(() => {
    if (email) {
      axios
        .get(`/tickets/by-user?email=${email}`) // raccourci via baseURL "/api"
        .then((res) => {
          console.log(" Tickets reçus :", res.data);
          setTickets(res.data);
        })
        .catch((err) => {
          console.error(" Erreur API tickets:", err);
          alert("Erreur lors du chargement des tickets.");
        });
    }
  }, [email]);

  return (
    <div className="container mt-5">
      <h2> Mes Tickets</h2>

      {!email ? (
        <div className="alert alert-warning mt-4">
          Vous devez être connecté pour voir vos tickets.
        </div>
      ) : tickets.length === 0 ? (
        <div className="alert alert-info mt-4">Aucun ticket pour le moment.</div>
      ) : (
        <div className="row mt-4">
          {tickets.map((ticket, index) => (
            <div className="col-md-4 mb-4" key={index}>
              <div className="card h-100 shadow-sm">
                <div className="card-body text-center">
                  <h5 className="card-title">Ticket #{ticket.id}</h5>
                  <p className="card-text">
                    <strong>Achat :</strong><br />
                    <code>{ticket.purchaseKey}</code>
                  </p>
                  <QRCodeSVG value={ticket.qrCode} size={128} />
                  <p className="mt-3">
                    <strong>QR Code :</strong><br />
                    <code>{ticket.qrCode}</code>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
