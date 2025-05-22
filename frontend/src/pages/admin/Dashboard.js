import React from 'react';
import { Link, Navigate } from 'react-router-dom';

export default function Dashboard() {
  if (!localStorage.getItem("admin_logged")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container py-5">
      <h2 className="text-center mb-5 text-primary"> Tableau de bord - Administration</h2>

      <div className="row justify-content-center g-4">
        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column text-center">
              <h5 className="card-title"> Gestion des utilisateurs</h5>
              <p className="card-text">Ajouter, modifier ou supprimer les comptes utilisateurs.</p>
              <Link to="/admin/users" className="btn btn-outline-primary mt-auto">
                Gérer les utilisateurs
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column text-center">
              <h5 className="card-title"> Gestion des offres</h5>
              <p className="card-text">Créer et gérer les offres de billets disponibles.</p>
              <Link to="/admin/offers" className="btn btn-outline-primary mt-auto">
                Gérer les offres
              </Link>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card h-100 shadow-sm">
            <div className="card-body d-flex flex-column text-center">
              <h5 className="card-title"> Suivi des commandes</h5>
              <p className="card-text">Visualiser les tickets achetés par les utilisateurs.</p>
              <Link to="/admin/tickets" className="btn btn-outline-primary mt-auto">
                Voir les tickets
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
