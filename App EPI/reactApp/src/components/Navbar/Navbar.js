import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    // Ajoute ici la logique de déconnexion (ex: suppression du token, redirection...)
    localStorage.removeItem("token");
    window.location.href = "/login";

  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
      <div className="container-fluid">
        <div className="logo-section">
          <h2 class="log">ATNER</h2>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className={`collapse navbar-collapse ${menuOpen ? "show" : ""}`}
          id="navbarNav"
        >
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/employee-management">
                Employés
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/produits">
                Produits
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/epi-management">
                Gestion EPI
              </Link>
            </li>


            <li className="nav-item">
              <Link className="nav-link" to="/dotations">
                Dotation
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/returns">
                Retours
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/reports">
                Utilisateur
              </Link>
            </li>
          </ul>
          {/* Bouton Logout aligné à droite */}
          <button className="btn-ranger" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
