import React, { useState } from "react";
import axios from "../axios"; // utilise axios personnalisé

export default function InscriptionUtilisateur() {
  const [formulaire, setFormulaire] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: ""
  });

  const [messageServeur, setMessageServeur] = useState("");
  const [reussi, setReussi] = useState(false);

  const gererChangement = (e) => {
    setFormulaire({ ...formulaire, [e.target.id]: e.target.value });
  };

  const soumettreFormulaire = async (e) => {
    e.preventDefault();

    try {
      const retour = await axios.post("/users/register", formulaire);
      setMessageServeur(retour.data);
      setReussi(true);
      setFormulaire({ firstName: "", lastName: "", email: "", password: "" });
    } catch (err) {
      setMessageServeur(err.response?.data || "Erreur serveur.");
      setReussi(false);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow">
            <div className="card-header bg-primary text-white text-center">
              <h4>Inscription - e-Tickets JO 2024</h4>
            </div>
            <div className="card-body">
              <form onSubmit={soumettreFormulaire}>
                <div className="mb-3">
                  <label htmlFor="firstName" className="form-label">Prénom</label>
                  <input type="text" className="form-control" id="firstName" value={formulaire.firstName} onChange={gererChangement} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="lastName" className="form-label">Nom</label>
                  <input type="text" className="form-control" id="lastName" value={formulaire.lastName} onChange={gererChangement} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input type="email" className="form-control" id="email" value={formulaire.email} onChange={gererChangement} required />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Mot de passe</label>
                  <input type="password" className="form-control" id="password" value={formulaire.password} onChange={gererChangement} required />
                </div>
                <button type="submit" className="btn btn-success w-100">S'inscrire</button>
              </form>
              {messageServeur && (
                <div className={`alert mt-3 ${reussi ? "alert-success" : "alert-danger"}`}>
                  {messageServeur}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
