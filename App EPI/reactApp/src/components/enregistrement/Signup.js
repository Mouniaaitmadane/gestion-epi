import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Signup.css"; // Import the CSS file

function Signup({ onSignup }) {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};

    if (!fullName) {
      newErrors.fullName = "Le nom complet est requis.";
    }

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

  const handleSignup = (e) => {
    e.preventDefault(); // Empêcher le comportement par défaut du formulaire
    if (validate()) {
      onSignup();
      navigate("/"); // Redirection après inscription
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-form-section">
        <h1>Page d'inscription</h1>
        <form onSubmit={handleSignup}>
          <div>
            <input
              type="text"
              placeholder="Nom complet"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            {errors.fullName && <p className="error">{errors.fullName}</p>}
          </div>
          <div>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            {errors.email && <p className="error">{errors.email}</p>}
          </div>
          <div>
            <input
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <button type="submit" class="sign">S'inscrire</button>
        </form>
        <p>
          Déjà un compte ?{" "}
          <span onClick={() => navigate("/login")} className="login-link">
            Connectez-vous
          </span>
        </p>
      </div>
    </div>
  );
}

export default Signup;
