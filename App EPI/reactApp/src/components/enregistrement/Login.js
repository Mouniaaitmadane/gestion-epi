import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import "./Login.css";

const images = [
  "/emage1.jpg",
  "/emage2.jpg",
  "/emage4.jpg",
  "/emage5.webp",
  "/emage.jpg",
];

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextImage();
    }, 3000);
    return () => clearInterval(interval);
  }, [index]);

  const nextImage = () => {
    setIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const prevImage = () => {
    setIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const validate = () => {
    const newErrors = {};
    if (!email) {
      newErrors.email = "L'email est requis.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "L'email est invalide.";
    }

    if (!password) {
      newErrors.password = "Le mot de passe est requis.";
    } else if (password.length < 6) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 6 caractères.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleLogin = () => {
    if (validate()) {
      onLogin();
      navigate("/");
    }
  };

  return (
    <div className="login-container">
      {/* Login Section */}
      <div className="login-form-section">
        <h1>Page de Connexion</h1>
        <form onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error-text">{errors.email}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error-text">{errors.password}</p>}
          </div>
          <button type="button" onClick={handleLogin} className="login-button">
            Se connecter
          </button>
        </form>
        <p>
          Pas encore de compte ?{" "}
          <span onClick={() => navigate("/signup")} className="signup-link">
            Inscrivez-vous
          </span>
        </p>
      </div>

      {/* Image Slider Section */}
      <div className="slider-section">
        <motion.img
          key={index}
          src={images[index]}
          alt="Background"
          className="slider-image"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
        />
        <div className="fixed-text">
          Un site de gestion des équipements de protection individuelle (EPI)
          permet aux entreprises de gérer efficacement la distribution, le suivi
          et le retour des équipements essentiels à la sécurité des employés. Il
          offre des fonctionnalités complètes, telles que la gestion des stocks,
          la traçabilité des dotations, la gestion des personnels équipés ainsi
          que la création de rapports détaillés pour une meilleure visibilité.
          Cette plateforme garantit une organisation optimale tout en
          contribuant à la conformité avec les normes de santé et sécurité au
          travail.
        </div>

        {/* Navigation Buttons */}
        <div className="button-left" onClick={prevImage}>
          &#9664;
        </div>
        <div className="button-right" onClick={nextImage}>
          &#9654;
        </div>
      </div>
    </div>
  );
}

export default Login;
