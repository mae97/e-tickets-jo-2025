import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios';

export default function Offers() {
  const [offres, setOffres] = useState([]);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("/offers")
      .then(res => setOffres(res.data))
      .catch(err => {
        console.error(" Erreur de chargement des offres :", err);
        setMessage("Erreur de chargement des offres.");
      });
  }, []);

  const addToCart = (offre) => {
    const email = localStorage.getItem("email");

    if (!email) {
      alert("Vous devez être connecté pour réserver une offre.");
      navigate("/login");
      return;
    }

    const existingCart = JSON.parse(localStorage.getItem("cart")) || [];
    existingCart.push(offre);
    localStorage.setItem("cart", JSON.stringify(existingCart));

    setMessage(` ${offre.name} ajouté au panier !`);
    setTimeout(() => setMessage(''), 3000);
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 text-primary"> Nos Offres de Billets</h2>

      {message && (
        <div className="alert alert-success text-center">{message}</div>
      )}

      <div className="row justify-content-center g-4">
        {offres.map((offre) => (
          <div className="col-md-4" key={offre.id}>
            <div className="card h-100 shadow-sm">
              <img src={offre.image} className="card-img-top" alt={offre.name} />
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{offre.name}</h5>
                <h6 className="text-success mb-2">{offre.price}€</h6>
                <p className="card-text flex-grow-1">
                  Accès à une ou plusieurs épreuves. Stock : {offre.quantity}
                </p>
                <button className="btn btn-outline-primary mt-auto" onClick={() => addToCart(offre)}>
                  Réserver
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
