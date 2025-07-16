import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./components/enregistrement/Login";
import Signup from "./components/enregistrement/Signup";
import Navbar from "./components/Navbar/Navbar";
import Produits from "./components/produits/produits";
import EPIManagement from "./components/EPIManagement/EPIManagement";
import EmployeeManagement from "./components/EmployeeManagement/EmployeeManagement";
import Dotation from "./components/Dotation/Dotation";
import Returns from "./components/Returns/Returns";
import Reports from "./components/utilisateurs/utilisateurs";
import Footer from "./components/Footer/Footer";
import "./App.css";


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const authStatus = localStorage.getItem("isAuthenticated");
    setIsAuthenticated(authStatus === "true");
  }, []);

  const handleLogin = () => {
    localStorage.setItem("isAuthenticated", "true");
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <Routes>
        {/* Full-screen login/signup pages */}
        <Route path="/login" element={<Login onLogin={handleLogin} />} />
        <Route path="/signup" element={<Signup onSignup={handleLogin} />} />

        {/* Redirect non-authenticated users to login */}
        {!isAuthenticated ? (
          <Route path="*" element={<Navigate to="/login" replace />} />
        ) : (
          // Authenticated users see full app
          <Route
            path="/*"
            element={
              <>
                <Navbar />
                <div className="container mt-4">
                  <Routes>
                    <Route
                      path="/"
                      element={<EmployeeManagement onLogout={handleLogout} />}
                    />
                    {/* <Route path="/produits" element={<Produits />} /> */}
                    <Route path="/epi-management" element={<EPIManagement />} />
                    <Route
                      path="/produits"
                      element={<Produits />}
                    />
                    <Route path="/dotations" element={<Dotation />} />
                    <Route path="/returns" element={<Returns />} />
                    <Route path="/reports" element={<Reports />} />
                    <Route path="*" element={<Navigate to="/" replace />} />
                  </Routes>
                </div>
                <Footer />
              </>
            }
          />
        )}
      </Routes>
    </Router>
  );
}

export default App;
