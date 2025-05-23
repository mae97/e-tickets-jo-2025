import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios'; 

export default function Cart() {
    const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem('cart')) || [];
    setCart(storedCart);
  }, []);

  const total = cart.reduce((sum, item) => {
    const prix = parseFloat(item.prix || item.price || 0);
    return sum + prix;
  }, 0);

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };

  const isLoggedIn = () => {
    return localStorage.getItem("email") !== null;
  };

  const handleCheckout = async () => {
    if (!isLoggedIn()) {
      alert("Vous devez vous connecter pour passer commande.");
      navigate("/login");
      return;
    }

    const email = localStorage.getItem("email");
    const titres = cart.map((item) => item.titre || item.name);

    try {
      const res = await axios.post("/tickets/purchase", {
        email: email,
        offres: titres
      });

      alert(res.data); // "Ticket enregistrés !"
      clearCart();
      navigate("/mes-tickets");
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Erreur lors de l'enregistrement de la commande.");
    }
  };

  return (
    <div className="container mt-5">
      <h2> Votre Panier</h2>

      {cart.length === 0 ? (
        <div className="alert alert-warning mt-4">Votre panier est vide.</div>
      ) : (
        <>
          <ul className="list-group my-4">
            {cart.map((item, index) => (
              <li className="list-group-item d-flex justify-content-between align-items-center" key={index}>
                <div>
                    <strong>{item.titre || item.name}</strong><br />
                  <small>{item.description}</small>
                </div>
                <span className="badge bg-success">
                  {(item.prix || item.price || 0).toFixed(2)}€
                </span>
              </li>
            ))}
          </ul>

          <h5>Total : {total.toFixed(2)}€</h5>

          <div className="d-flex gap-3 mt-3">
               <button className="btn btn-danger" onClick={clearCart}>
              Vider le panier
            </button>

            <button className="btn btn-success" onClick={handleCheckout}>
              Commander
            </button>
          </div>

          <div className="alert alert-info mt-4">
             <strong>Paiement simulé :</strong> aucun débit réel ne sera effectué.
          </div>
        </>
      )}
    </div>
  );
}
