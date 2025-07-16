import React from "react";
import "./Footer.css";
import { FaFacebook, FaTwitter, FaLinkedin } from "react-icons/fa"; // Assurez-vous d'installer react-icons

function Footer() {
  return (
    <footer className="footer bg-dark text-light">
      <div className="container text-center py-3">
        <p>
          &copy; {new Date().getFullYear()} Gestion des EPI - Tous droits
          réservés.
        </p>
        <div className="social-links">
          <a
            href="https://www.facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3"
          >
            <FaFacebook size={30} />
          </a>
          <a
            href="https://www.twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3"
          >
            <FaTwitter size={30} />
          </a>
          <a
            href="https://www.linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="mx-3"
          >
            <FaLinkedin size={30} />
          </a>
        </div>
        <div className="mt-3">
          <a href="/terms" className="text-light mx-2">
            Conditions d'utilisation
          </a>
          <a href="/privacy" className="text-light mx-2">
            Politique de confidentialité
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
