import React from 'react';

export default function UsersTable() {
  // Exemple de données statiques pour tester 
  const users = [
    { id: 1, firstName: 'Patrice', lastName: 'Guayroso', email: 'patrice@example.com' },
    { id: 2, firstName: 'Eva', lastName: 'Dev', email: 'eva@example.com' },
    { id: 3, firstName: 'John', lastName: 'Doe', email: 'john@example.com' }
  ];

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center">Liste des Utilisateurs</h2>
      <table className="table table-striped">
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>Prénom</th>
            <th>Nom</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.firstName}</td>
              <td>{user.lastName}</td>
              <td>{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

