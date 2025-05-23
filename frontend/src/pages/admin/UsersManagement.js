import React, { useEffect, useState } from 'react';
import axios from '../../axios'; 
import { Navigate } from 'react-router-dom';

export default function UsersManagement() {
  const [users, setUsers] = useState([]);
    const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    admin: false,
  });
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("/users/all");
      setUsers(res.data);
    } catch (err) {
      console.error("Erreur lors du chargement des utilisateurs", err);
    }
  };

  const handleDelete = async (id) => {
      if (!window.confirm("Confirmer la suppression ?")) return;
    try {
      await axios.delete(`/users/${id}`);
      fetchUsers();
    } catch (err) {
      console.error(" Erreur suppression :", err);
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`/users/${editId}`, form);
      } else {
          await axios.post("/users/register", form);
      }

      fetchUsers();
      resetForm();
    } catch (err) {
      console.error(" Erreur enregistrement :", err);
      alert(err.response?.data || "Erreur lors de l'enregistrement.");
    }
  };

  const handleEdit = (user) => {
    setForm({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
       password: '', 
      admin: user.admin,
    });
    setEditId(user.id);
  };

  const resetForm = () => {
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      admin: false,
    });
    setEditId(null);
  };

  if (!localStorage.getItem("admin_logged")) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="container mt-4">
      <h2> Gestion des Utilisateurs</h2>

      // Formulaire Ajout et Modification 
      <form onSubmit={handleSubmit} className="row g-3 mb-4">
        <div className="col-md-3">
          <input
            type="text"
            name="firstName"
            className="form-control"
            placeholder="Prénom"
            required
            value={form.firstName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="text"
            name="lastName"
            className="form-control"
            placeholder="Nom"
            required
            value={form.lastName}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-3">
          <input
            type="email"
            name="email"
            className="form-control"
            placeholder="Email"
            required
            value={form.email}
            onChange={handleChange}
            disabled={!!editId}
          />
        </div>
        <div className="col-md-2">
          <input
            type="password"
            name="password"
            className="form-control"
            placeholder="Mot de passe"
            required={!editId}
            value={form.password}
            onChange={handleChange}
          />
        </div>
        <div className="col-md-1 d-flex align-items-center">
          <div className="form-check">
            <input
              className="form-check-input"
              type="checkbox"
              name="admin"
              id="adminCheck"
              checked={form.admin}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="adminCheck">Admin</label>
          </div>
        </div>
        <div className="col-md-12 d-flex gap-2">
          <button type="submit" className={`btn ${editId ? 'btn-warning' : 'btn-success'}`}>
            {editId ? "Modifier" : "Ajouter"}
          </button>
          {editId && (
            <button type="button" className="btn btn-secondary" onClick={resetForm}>
              Annuler
            </button>
          )}
        </div>
      </form>

      {/* Tableau Utilisateurs */}
      {users.length === 0 ? (
        <p>Aucun utilisateur enregistré.</p>
      ) : (
        <table className="table table-bordered table-hover mt-3">
          <thead className="table-light">
            <tr>
              <th>ID</th>
              <th>Nom</th>
              <th>Prénom</th>
              <th>Email</th>
              <th>Admin ?</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.lastName}</td>
                <td>{user.firstName}</td>
                <td>{user.email}</td>
                <td>{user.admin ? "oui" : "non"}</td>
                <td className="d-flex gap-2">
                  <button className="btn btn-primary btn-sm" onClick={() => handleEdit(user)}>Modifier</button>
                  <button className="btn btn-danger btn-sm" onClick={() => handleDelete(user.id)}>Supprimer</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
