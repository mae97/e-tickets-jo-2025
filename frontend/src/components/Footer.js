import React from 'react';

export default function Footer() {
  return (
    <footer style={styles.footer}>
      <div style={styles.content}>
        <p style={styles.text}>© {new Date().getFullYear()} e-Tickets JO 2025. Tous droits réservés.</p>
        <p style={styles.text}>Conçu pour les passionnés de sport.</p>
      </div>
    </footer>
  );
}

const styles = {
  footer: {
    backgroundColor: '#003366',
    color: 'white',
    padding: '20px 0',
    marginTop: '40px',
    textAlign: 'center'
  },
  content: {
    maxWidth: '960px',
    margin: '0 auto',
    padding: '0 15px'
  },
  text: {
    margin: '5px 0',
    fontSize: '14px'
  }
};
