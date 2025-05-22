import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Home() {
  const [email, setEmail] = useState("");
  const [showDetails, setShowDetails] = useState([false, false, false]);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("email");
    if (storedEmail) setEmail(storedEmail);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("email");
	localStorage.removeItem("admin_logged");
    navigate("/login");
  };

  const toggleDetails = (index) => {
    const newDetails = [...showDetails];
    newDetails[index] = !newDetails[index];
    setShowDetails(newDetails);
  };

  const slides = [
    { img: "/images/img2.jpg", alt: "Slide 1", caption: "Réservez dès maintenant vos billets pour les JO 2025 !" },
    { img: "/images/img3.jpg", alt: "Slide 2", caption: "Ne manquez aucun événement sportif !" },
    { img: "/images/img5.jpg", alt: "Slide 3", caption: "Vivez une expérience inoubliable avec vos proches !" },
  ];

  const epreuves = [
    {
      titre: "Natation",
      image: "/images/sport1.jpg",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin a felis sit amet purus blandit pharetra."
    },
    {
      titre: "Athlétisme",
      image: "/images/sport2.jpg",
      description: "Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer varius felis."
    },
    {
      titre: "Gymnastique",
      image: "/images/sport3.jpg",
      description: "Nulla facilisi. Suspendisse potenti. Vivamus eget dignissim sem, nec dapibus neque. Aliquam erat volutpat."
    }
  ];

  return (
    <>
      {email && (
        <div className="alert alert-success text-center d-flex justify-content-between align-items-center px-4 m-0">
          <span>Connecté en tant que <strong>{email}</strong></span>
          <button onClick={handleLogout} className="btn btn-outline-danger btn-sm">Déconnexion</button>
        </div>
      )}

      <div id="carouselExampleAutoplaying" className="carousel slide" data-bs-ride="carousel">
        <div className="carousel-inner">
          {slides.map((slide, index) => (
            <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
              <img src={slide.img} className="d-block w-100" alt={slide.alt} style={{ maxHeight: '500px', objectFit: 'cover' }} />
              <div className="carousel-caption d-none d-md-block text-start" style={{ backgroundColor: "rgba(0, 0, 0, 0.5)", padding: '20px', borderRadius: '8px' }}>
                <h2>{slide.caption}</h2>
                <Link to="/offers" className="btn btn-warning mt-3 fw-bold"> Voir les Offres</Link>
              </div>
            </div>
          ))}
        </div>

        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Précédent</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Suivant</span>
        </button>
      </div>

      <div className="container my-5 text-center">
        <h1 className="text-primary mb-4"> Épreuves phares des JO 2025</h1>

        <div className="row justify-content-center g-4">
          {epreuves.map((epreuve, index) => (
            <div className="col-md-4" key={index}>
              <div className="card h-100 shadow-sm">
                <img src={epreuve.image} className="card-img-top" alt={epreuve.titre} style={{ height: '200px', objectFit: 'cover' }} />
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title">{epreuve.titre}</h5>
                  <button
                    className="btn btn-outline-info mt-auto"
                    onClick={() => toggleDetails(index)}
                  >
                    {showDetails[index] ? "Masquer" : "Détails"}
                  </button>
                  {showDetails[index] && (
                    <p className="mt-3 text-muted">{epreuve.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
