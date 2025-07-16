import React, { useState, useEffect } from "react";
import "./EPIManagement.css";
const categories = {
  "Casque de sécurité": ["Visière", "Bande anti-transpiration"],
  Visière: ["Ajustable", "Antibuée"],
  "Gants anti-coupure": ["Revêtement grip", "Renfort paume"],
  "Gants en nitrile": ["Résistants aux produits chimiques", "Confortable"],
  "Chaussures de sécurité": ["Semelle antidérapante", "Coque acier"],
  "Bottes de sécurité": ["Imperméables", "Antidérapantes"],
  "Lunettes de sécurité": ["Antibuée", "Confortables"],
  "Bouchons d'oreilles": ["Réducteurs de bruit"],
  "Casques antibruit": ["Réducteurs de bruit", "Confortable et réglable"],
  "Masques de protection": ["Confortable", "Filtrant"],
  "Harnais de sécurité": ["Réglable", "Confortable"],
  "Cordes de sécurité": ["Résistants", "Réglables"],
  "Vêtements ignifugés": ["Résistants à la chaleur", "Confortables"],
};

const EManagement = () => {
  const [epiList, setEpiList] = useState({
    categorie: "",
    nomEquipement: "",
    idProduit: "",
    quantiteStock: "",
  });
  const [newEpi, setNewEpi] = useState([]);

  // Fonction pour récupérer les équipements
  useEffect(() => {

      const fetchNewEpi = async () => {
        try {
          const response = await fetch("http://localhost:8080/equipements");
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des employés");
          }
          const data = await response.json();
          setNewEpi(data);
          console.log("new epi=",newEpi);
          
        } catch (error) {
          
          console.error("Erreur:", error);
        }
      };
   
  
      fetchNewEpi();
    }, [epiList]); // Exécuté une seule fois au montage
  

  // Gestion de la modification des champs de formulaire
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEpiList((prev) => ({
      ...prev,
      [name]: value,
      ...(name === "categorie" ? { nomEquipement: "" } : {}),
    }));
  };

  // Gestion de la soumission du formulaire
 const handleSubmit = async (e) => {
   e.preventDefault();

   if (
     !epiList.categorie ||
     !epiList.nomEquipement ||
     !epiList.idProduit ||
     !epiList.quantiteStock
   ) {
     alert("Veuillez remplir tous les champs.");
     return;
   }

   try {
     const response = await fetch("http://localhost:8080/equipements", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(epiList),
     });

     if (!response.ok) {
       const errorText = await response.json();
       alert(`Erreur : ${errorText.error}`);
       return;
     }

     setEpiList({
       categorie: "",
       nomEquipement: "",
       idProduit: "",
       quantiteStock: "",
     });
     alert("Équipement ajouté avec succès");
   } catch (error) {
     console.error("Erreur:", error);
     alert("Erreur lors de l'ajout de l'équipement");
   }
 };

  return (
    <div className="epiList-management">
      <h1>Ajouter un Équipement</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="categorie">Catégorie :</label>
          <select
            name="categorie"
            value={epiList.categorie}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez une catégorie</option>
            {Object.keys(categories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="nomEquipement">Nom Équipement :</label>
          <select
            name="nomEquipement"
            value={epiList.nomEquipement}
            onChange={handleChange}
            required
          >
            <option value="">Sélectionnez un équipement</option>
            {epiList.categorie &&
              categories[epiList.categorie].map((sousCat) => (
                <option key={sousCat} value={sousCat}>
                  {sousCat}
                </option>
              ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="idProduit">ID Produit :</label>
          <input
            type="text"
            name="idProduit"
            value={epiList.idProduit}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="quantiteStock">Quantité Stock :</label>
          <input
            type="number"
            name="quantiteStock"
            value={epiList.quantiteStock}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Ajouter l'Équipement
        </button>
      </form>

      <h2>Liste des Équipements</h2>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Catégorie</th>
            <th>Nom Équipement</th>
            <th>ID Produit</th>
            <th>Quantité Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {newEpi.map((epiList, index) => (
            <tr key={index}>
              <td>{index}</td>
              <td>{epiList.categorie}</td>
              <td>{epiList.nom_equipement}</td>
              <td>{epiList.id_produit}</td>
              <td>{epiList.quantite_stock}</td>
              <td>
                <button
                  className="btn btn-danger"
                  
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

export default EManagement;
