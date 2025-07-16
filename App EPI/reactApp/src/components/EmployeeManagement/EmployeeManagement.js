import React, { useState, useEffect } from "react";
import "./EmployeeManagement.css";

const EmployeeManagement = () => {
  const [employee, setEmployee] = useState({
    nom: "",
    prenom: "",
    fonction: "",
    cin: "",
    dateEmbauche: "",
    pointureChaussures: "",
    taille: "",
    dateDepart: "",
  });
  const [employees, setEmployees] = useState([]);

  // Fonction pour récupérer la liste des employés

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("http://localhost:8080/employes");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des employés");
        }
        const data = await response.json();
        setEmployees(data);
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchEmployees();
  }, [employee]); // Exécuté une seule fois au montage

  // Gérer les changements des inputs du formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Gérer la soumission du formulaire
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !employee.nom ||
      !employee.prenom ||
      !employee.fonction ||
      !employee.cin ||
      !employee.dateEmbauche ||
      !employee.pointureChaussures ||
      !employee.taille
    ) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }

    // Formater les dates avant de les envoyer
    const formattedDateEmbauche = new Date(employee.dateEmbauche)
      .toISOString()
      .split("T")[0]; // Format YYYY-MM-DD

    const formattedDateDepart = employee.dateDepart
      ? new Date(employee.dateDepart).toISOString().split("T")[0]
      : "N/A"; // Si la date de départ est vide, on met "N/A"
    console.log("Données envoyées à l'API:", {
      ...employee,
      dateEmbauche: formattedDateEmbauche,
      dateDepart: formattedDateDepart,
    });

    try {
      const response = await fetch("http://localhost:8080/employes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...employee,
          dateEmbauche: formattedDateEmbauche,
          dateDepart: formattedDateDepart,
        }),
      });
      console.log("Réponse du serveur:", response);

      // Vérifier si la réponse est correcte
      if (!response.ok) {
        const errorText = await response.text();
        console.error("Erreur dans la réponse du serveur:", errorText);
        alert(`Erreur lors de l'ajout de l'employé: ${errorText}`);
        return;
      }

      // Recharger la liste des employés depuis l'API
      const employeesResponse = await fetch("http://localhost:8080/employes");
      const employeesData = await employeesResponse.json();
      console.log("Données des employés:", employeesData);
      // Mettre à jour la liste des employés dans l'état
      setEmployees(employeesData);

      // Réinitialiser le formulaire
      setEmployee({
        nom: "",
        prenom: "",
        fonction: "",
        cin: "",
        dateEmbauche: "",
        pointureChaussures: "",
        taille: "",
        dateDepart: "",
      });

      alert("Employé ajouté avec succès");
    } catch (error) {
      console.error("Erreur:", error);
      alert("Erreur lors de l'ajout de l'employé");
    }
  };
  const handleDelete = async (cin) => {
    if (window.confirm("Voulez-vous vraiment supprimer cet employé ?")) {
      try {
        const response = await fetch(`http://localhost:8080/employes/${cin}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Erreur lors de la suppression de l'employé");
        }

        // Mettre à jour l'état après la suppression
        setEmployees(employees.filter((emp) => emp.cin !== cin));
        alert("Employé supprimé avec succès !");
      } catch (error) {
        console.error("Erreur:", error);
        alert("Impossible de supprimer l'employé.");
      }
    }
  };


  return (
    <div className="employee-management">
      <h1>Ajouter un Employé</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="nom">Nom:</label>
          <input
            type="text"
            id="nom"
            name="nom"
            value={employee.nom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="prenom">Prénom:</label>
          <input
            type="text"
            id="prenom"
            name="prenom"
            value={employee.prenom}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="fonction">Fonction:</label>
          <input
            type="text"
            id="fonction"
            name="fonction"
            value={employee.fonction}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="cin">CIN:</label>
          <input
            type="text"
            id="cin"
            name="cin"
            value={employee.cin}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="dateEmbauche">Date d'embauche:</label>
          <input
            type="date"
            id="dateEmbauche"
            name="dateEmbauche"
            value={employee.dateEmbauche}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="pointureChaussures">Pointure des Chaussures:</label>
          <select
            id="pointureChaussures"
            name="pointureChaussures"
            value={employee.pointureChaussures}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner une pointure</option>
            <option value="36">36</option>
            <option value="37">37</option>
            <option value="38">38</option>
            <option value="39">39</option>
            <option value="40">40</option>
            <option value="41">41</option>
            <option value="42">42</option>
            <option value="43">43</option>
            <option value="44">44</option>
            <option value="45">45</option>
            <option value="46">46</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="taille">Taille de Vêtement:</label>
          <select
            id="taille"
            name="taille"
            value={employee.taille}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionner une taille</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
            <option value="XXL">XXL</option>
            <option value="XXL">XXXL</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="dateDepart">Date de départ:</label>
          <input
            type="date"
            id="dateDepart"
            name="dateDepart"
            value={employee.dateDepart}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Ajouter l'Employé
        </button>
      </form>

      {/* Affichage de la liste des employés */}
      <h2>Liste des Employés</h2>

      <table className="table">
        <thead>
          <tr>
            <th>id</th>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Fonction</th>
            <th>CIN</th>
            <th>Date d'Embauche</th>
            <th>Pointure</th>
            <th>Taille</th>
            <th>Date de Départ</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{employee.nom}</td>
              <td>{employee.prenom}</td>
              <td>{employee.fonction}</td>
              <td>{employee.cin}</td>
              <td>{new Date(employee.date_embauche).toLocaleDateString()}</td>
              <td>{employee.pointure_chaussures}</td>
              <td>{employee.taille}</td>
              <td>
                {employee.date_depart
                  ? new Date(employee.date_depart).toLocaleDateString()
                  : "N/A"}
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => handleDelete(employee.cin)}
                >
                  Supprimer
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeManagement;
