import React, { useEffect, useState } from 'react';
import axios from '../../axios'; 
import { Navigate } from 'react-router-dom';

export default function OffersManagement() {
  const [offers, setOffers] = useState([]);
  const [newOffer, setNewOffer] = useState({ name: '', price: '', quantity: '', image: '' });
  const [editMode, setEditMode] = useState(false);
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchOffers();
  }, []);

  const fetchOffers = async () => {
    try {
      const res = await axios.get('/offers');
      setOffers(res.data);
    } catch (err) {
      console.error('Erreur chargement des offres', err);
    }
  };

  const handleChange = (e) => {
    setNewOffer({ ...newOffer, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editMode) {
        await axios.put(`/offers/${editId}`, newOffer); 
      } else {
        await axios.post('/offers', newOffer); 
      }

      // Réinitialiser
      setNewOffer({ name: '', price: '', quantity: '', image: '' });
      setEditMode(false);
      setEditId(null);
      fetchOffers();
    } catch (err) {
      console.error('Erreur ajout/modification offre', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Confirmer la suppression ?')) return;
    try {
      await axios.delete(`/offers/${id}`);
      fetchOffers();
    } catch (err) {
      console.error('Erreur suppression offre', err);
    }
  };

  const handleEdit = (offer) => {
    setNewOffer({
      name: offer.name,
      price: offer.price,
      quantity: offer.quantity,
      image: offer.image
    });
    setEditMode(true);
    setEditId(offer.id);
  };

  const cancelEdit = () => {
    setEditMode(false);
    setEditId(null);
    setNewOffer({ name: '', price: '', quantity: '', image: '' });
  };

  if (!localStorage.getItem('admin_logged')) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mt-4">
      <h2>Gestion des Offres</h2>

      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-3">
          <input type="text" name="name" className="form-control" placeholder="Nom de l'offre" required value={newOffer.name} onChange={handleChange} />
        </div>
        <div className="col-md-2">
          <input type="number" name="price" className="form-control" placeholder="Prix (€)" required value={newOffer.price} onChange={handleChange} />
        </div>
        <div className="col-md-2">
          <input type="number" name="quantity" className="form-control" placeholder="Quantité" required value={newOffer.quantity} onChange={handleChange} />
        </div>
        <div className="col-md-3">
          <input type="text" name="image" className="form-control" placeholder="URL de l'image" required value={newOffer.image} onChange={handleChange} />
        </div>
        <div className="col-md-2 d-flex gap-2">
          <button type="submit" className={`btn ${editMode ? 'btn-warning' : 'btn-success'} w-100`}>
            {editMode ? "Modifier" : "Ajouter"}
          </button>
          {editMode && (
            <button type="button" className="btn btn-secondary" onClick={cancelEdit}>Annuler</button>
          )}
        </div>
      </form>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nom</th>
            <th>Prix</th>
            <th>Quantité</th>
            <th>Image</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {offers.map((offer) => (
            <tr key={offer.id}>
              <td>{offer.id}</td>
              <td>{offer.name}</td>
              <td>{offer.price} €</td>
              <td>{offer.quantity}</td>
              <td><img src={offer.image} alt={offer.name} width="60" /></td>
              <td className="d-flex gap-2">
                <button className="btn btn-sm btn-primary" onClick={() => handleEdit(offer)}>Modifier</button>
                <button className="btn btn-sm btn-danger" onClick={() => handleDelete(offer.id)}>Supprimer</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
