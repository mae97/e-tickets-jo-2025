import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../axios'; // axios configuré avec baseURL = '/api'

export default function ConnexionUtilisateur() {
  const [identifiants, setIdentifiants] = useState({ email: '', password: '' });
  const [messageServeur, setMessageServeur] = useState('');
  const [chargement, setChargement] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setIdentifiants({ ...identifiants, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setChargement(true);
    setMessageServeur('');
    try {
      const retour = await axios.post('/users/login', identifiants);

      if (retour.data === 'admin') {
        localStorage.setItem('admin_logged', 'true');
        navigate('/admin');
      } else {
        localStorage.setItem('email', identifiants.email);
        navigate('/');
      }

      window.location.reload(); // pour rafraîchir le header
    } catch (err) {
      setMessageServeur(err.response?.data || 'Erreur de connexion');
    }
    setChargement(false);
  };

  return (
    <div className="container d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
      <div className="card shadow p-4" style={{ maxWidth: '450px', width: '100%' }}>
        <h2 className="text-center mb-4 text-primary"> Connexion - e-Tickets JO 2025</h2>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Adresse Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="ex: prenom.nom@email.com"
              required
              value={identifiants.email}
              onChange={handleChange}
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Mot de passe</label>
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="********"
              required
              value={identifiants.password}
              onChange={handleChange}
            />
          </div>

          <button type="submit" className="btn btn-primary w-100" disabled={chargement}>
            {chargement ? 'Connexion...' : 'Se connecter'}
          </button>
        </form>

        {messageServeur && (
          <div className={`alert mt-4 ${messageServeur.includes('réussie') ? 'alert-success' : 'alert-danger'}`}>
            {messageServeur}
          </div>
        )}
      </div>
    </div>
  );
}
