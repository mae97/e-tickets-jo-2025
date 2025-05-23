import React, { useEffect, useState } from 'react';
import axios from '../../axios';
import { Navigate } from 'react-router-dom';

export default function TicketsManagement() {
   const [tickets, setTickets] = useState([]);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      const res = await axios.get("/tickets/all");
        console.log("Tickets reçus:", res.data);
      setTickets(res.data);
    } catch (err) {
      console.error("Erreur chargement tickets", err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Confirmer la suppression de ce ticket ?")) return;
    try {
        await axios.delete(`/tickets/${id}`);
      fetchTickets();
    } catch (err) {
        console.error("Erreur suppression ticket :", err);
      alert("Erreur lors de la suppression.");
    }
  };

  if (!localStorage.getItem("admin_logged")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mt-4">
        <h2>Tickets achetés</h2>
      {tickets.length === 0 ? (
        <p>Aucun ticket enregistré.</p>
      ) : (
        <table className="table table-bordered table-hover mt-3">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Email acheteur</th>
              <th>Clé d'achat</th>
                <th>QR Code</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {tickets.map((ticket) => (
              <tr key={ticket.id}>
                <td>{ticket.id}</td>
                <td>{ticket.clientRef}</td>
                <td>{ticket.purchaseKey}</td>
                   <td>{ticket.qrCode}</td>
                <td>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(ticket.id)}
                  >
                    Supprimer
                  </button>
                </td>
                </tr>
            ))}
          </tbody>
         </table>
      )}
    </div>
  );
}
