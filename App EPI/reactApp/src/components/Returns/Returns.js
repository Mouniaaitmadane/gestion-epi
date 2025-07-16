import React, { useState, useEffect } from "react";
import "./Returns.css";

const Retours = () => {
  const [retour, setRetour] = useState({
    id_employee: "",
    id_equipement: "",
    date_retour: "",
    quantite_retournee: "",
  });

  const [employees, setEmployees] = useState([]);
  const [equipements, setEquipements] = useState([]);
  const [retours, setRetours] = useState([]);

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

  // Récupérer les retours
  useEffect(() => {
    const fetchRetours = async () => {
      try {
        const response = await fetch("http://localhost:8080/retours");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des retours");
        }
        const data = await response.json();
        console.log("Retours récupérés:", data); // Vérification des données
        setRetours(data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchRetours();
  }, []);

  // Gérer les changements des inputs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setRetour((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !retour.id_employee ||
      !retour.id_equipement ||
      !retour.date_retour ||
      !retour.quantite_retournee
    ) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/retours", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(retour),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erreur dans la réponse du serveur:", errorText);
        alert(`Erreur lors de l'ajout du retour: ${errorText}`);
        return;
      }

      // Recharger la liste des retours
      const retoursResponse = await fetch("http://localhost:8080/retours");
      const retoursData = await retoursResponse.json();
      setRetours(retoursData);

      // Réinitialiser le formulaire
      setRetour({
        id_employee: "",
        id_equipement: "",
        date_retour: "",
        quantite_retournee: "",
      });

      alert("Retour ajouté avec succès");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de l'ajout du retour");
    }
  };

  return (
    <div className="retour-management">
      <h1>Ajouter un Retour</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="id_employee">Employé:</label>
          <select
            id="id_employee"
            name="id_employee"
            value={retour.id_employee}
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
            value={retour.id_equipement}
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
          <label htmlFor="date_retour">Date de retour:</label>
          <input
            type="date"
            id="date_retour"
            name="date_retour"
            value={retour.date_retour}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantite_retournee">Quantité retournée:</label>
          <input
            type="number"
            id="quantite_retournee"
            name="quantite_retournee"
            value={retour.quantite_retournee}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Ajouter le Retour
        </button>
      </form>

      {/* Affichage de la liste des retours */}
      <h2>Liste des Retours</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employé</th>
            <th>Équipement</th>
            <th>Date de Retour</th>
            <th>Quantité retournée</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {retours.map((retour, index) => (
            <tr key={index}>
              <td>{retour.id}</td>
              <td>{retour.id_employee}</td>
              <td>{retour.id_equipement}</td>
              <td>{new Date(retour.date_retour).toLocaleDateString()}</td>
              <td>{retour.quantite_retournee}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Retours;
