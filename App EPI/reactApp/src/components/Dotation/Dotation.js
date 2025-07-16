import React, { useState, useEffect } from "react";
import "./Dotation.css";

const Dotation = () => {
  const [dotation, setDotation] = useState({
    id_employee: "",
    id_equipement: "",
    date_dotation: "",
    quantite: "",
  });

  const [employees, setEmployees] = useState([]);
  const [equipements, setEquipements] = useState([]);
  const [dotations, setDotations] = useState([]);

  // Récupérer les employés
  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/employes");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des employés");
        }
        const data = await response.json();
        console.log("Employés récupérés:", data); // Vérification des données
        setEmployees(data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchEmployees();
  }, []);

  // Récupérer les équipements
  useEffect(() => {
    const fetchEquipements = async () => {
      try {
        const response = await fetch("http://localhost:8080/equipements");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des équipements");
        }
        const data = await response.json();
        console.log("Équipements récupérés:", data); // Vérification des données
        setEquipements(data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchEquipements();
  }, []);

  // Récupérer les dotations
  useEffect(() => {
    const fetchDotations = async () => {
      try {
        const response = await fetch("http://localhost:8080/dotations");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des dotations");
        }
        const data = await response.json();
        console.log("Dotations récupérées:", data); // Vérification des données
        setDotations(data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchDotations();
  }, []);

  // Gérer les changements des inputs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDotation((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !dotation.id_employee ||
      !dotation.id_equipement ||
      !dotation.date_dotation ||
      !dotation.quantite
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/dotations", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(dotation),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erreur dans la réponse du serveur:", errorText);
        alert(`Erreur lors de l'ajout de la dotation: ${errorText}`);
        return;
      }

      // Recharger la liste des dotations
      const dotationsResponse = await fetch("http://localhost:8080/dotations");
      const dotationsData = await dotationsResponse.json();
      setDotations(dotationsData);

      // Réinitialiser le formulaire
      setDotation({
        id_employee: "",
        id_equipement: "",
        date_dotation: "",
        quantite: "",
      });

      alert("Dotation ajoutée avec succès");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de l'ajout de la dotation");
    }
  };

  return (
    <div className="dotation-management">
      <h1>Ajouter une Dotation</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id_employee">Employé:</label>
          <select
            id="id_employee"
            name="id_employee"
            value={dotation.id_employee}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner un employé</option>
            {employees.length > 0 ? (
              employees.map((emp) => (
                <option key={emp.id} value={emp.id}>
                  {emp.nom} {emp.prenom}
                </option>
              ))
            ) : (
              <option disabled>Aucun employé disponible</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="id_equipement">Équipement:</label>
          <select
            id="id_equipement"
            name="id_equipement"
            value={dotation.id_equipement}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner un équipement</option>
            {equipements.length > 0 ? (
              equipements.map((equip) => (
                <option key={equip.id} value={equip.id}>
                  {equip.nom}
                </option>
              ))
            ) : (
              <option disabled>Aucun équipement disponible</option>
            )}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="date_dotation">Date de dotation:</label>
          <input
            type="date"
            id="date_dotation"
            name="date_dotation"
            value={dotation.date_dotation}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantite">Quantité:</label>
          <input
            type="number"
            id="quantite"
            name="quantite"
            value={dotation.quantite}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Ajouter la Dotation
        </button>
      </form>

      {/* Affichage de la liste des dotations */}
      <h2>Liste des Dotations</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employé</th>
            <th>Équipement</th>
            <th>Date de Dotation</th>
            <th>Quantité</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {dotations.map((dotation, index) => (
            <tr key={index}>
              <td>{dotation.id}</td>
              <td>{dotation.id_employee}</td>
              <td>{dotation.id_equipement}</td>
              <td>{new Date(dotation.date_dotation).toLocaleDateString()}</td>
              <td>{dotation.quantite}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Dotation;
