import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './Home';
import ConnexionUtilisateur from './Connexion';
import Offers from './Offers';
import Cart from './Cart';
import MesTickets from './MesTickets';
import InscriptionUtilisateur from './InscriptionUtilisateur';
import Layout from '../components/Layout';

import Dashboard from './admin/Dashboard';
import UsersManagement from './admin/UsersManagement';
import OffersManagement from './admin/OffersManagement';
import TicketsManagement from './admin/TicketsManagement';

export default function App() {
  return (
    <Layout>
      <Routes>
        
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<ConnexionUtilisateur />} />
        <Route path="/register" element={<InscriptionUtilisateur />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/mes-tickets" element={<MesTickets />} />  

        <Route path="/admin" element={<Dashboard />} />
        <Route path="/admin/users" element={<UsersManagement />} />
        <Route path="/admin/offers" element={<OffersManagement />} />
        <Route path="/admin/tickets" element={<TicketsManagement />} />
      </Routes>
    </Layout>
  );
}
