import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

export default function Header() {
  const [email, setEmail] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    setEmail(localStorage.getItem("email"));
    setIsAdmin(localStorage.getItem("admin_logged") === "true");
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
    localStorage.removeItem("admin_logged");
    setEmail(null);
    setIsAdmin(false);
    window.location.href = "/login";
  };

  return (
    <header style={styles.header}>
      <h1 style={styles.title}> e-Tickets JO 2025</h1>
      <nav style={styles.nav}>
        <CustomLink to="/" label="Accueil" />
        <CustomLink to="/offers" label="Offres" />
        <CustomLink to="/cart" label=" Panier" />

        {email && <CustomLink to="/mes-tickets" label="Mes Tickets" />}
        {isAdmin && <CustomLink to="/admin" label=" Admin Dashboard" />}

        {(email || isAdmin) ? (
          <button onClick={handleLogout} style={styles.logoutBtn}>Se déconnecter</button>
        ) : (
          <>
            <CustomLink to="/register" label="Inscription" />
            <CustomLink to="/login" label="Connexion" />
          </>
        )}
      </nav>
    </header>
  );
}

function CustomLink({ to, label }) {
  return (
    <Link to={to} style={styles.link} className="hover-link">
      {label}
    </Link>
  );
}

const styles = {
  header: {
    backgroundColor: '#003366',
    padding: '15px 30px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexWrap: 'wrap',
    color: 'white',
    boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
  },
  title: {
    margin: 0,
    fontSize: '26px',
    fontWeight: 'bold'
  },
  nav: {
    display: 'flex',
    gap: '20px',
    flexWrap: 'wrap',
    alignItems: 'center'
  },
  link: {
    color: '#fff',
    textDecoration: 'none',
    fontWeight: '500',
    fontSize: '16px',
    transition: 'color 0.3s'
  },
  logoutBtn: {
    backgroundColor: '#cc0000',
    border: 'none',
    color: 'white',
    padding: '6px 12px',
    borderRadius: '5px',
    cursor: 'pointer',
    fontSize: '14px'
  }
};
