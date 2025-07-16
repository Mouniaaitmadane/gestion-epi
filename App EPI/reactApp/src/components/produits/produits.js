import React, { useState } from "react";
import "./produits.css"; // Pour les styles supplémentaires

// Liste des produits de protection individuelle
const produitsData = [
  {
    id: 1,
    nom: "Casque de sécurité",
    categorie: "Protection de la tête",
    description:
      "Casque robuste conçu pour protéger contre les chocs et les impacts.",
    fournisseur: "SécuriPro",
    equipements: [
      { id: 101, nom: "Visière" },
      { id: 102, nom: "Bande anti-transpiration" },
    ],
    
  },
  {
    id: 2,
    nom: "Visière",
    categorie: "Protection de la tête",
    description:
      "Protection faciale contre les projections de substances ou objets.",
    fournisseur: "SafetyGear",
    equipements: [
      { id: 103, nom: "Ajustable" },
      { id: 104, nom: "Antibuée" },
    ],
  },
  {
    id: 3,
    nom: "Gants anti-coupure",
    categorie: "Protection des mains",
    description:
      "Gants résistants aux coupures et perforations, utilisés pour la manipulation de matériaux tranchants.",
    fournisseur: "ProtectGlove",
    equipements: [
      { id: 105, nom: "Revêtement grip" },
      { id: 106, nom: "Renfort paume" },
    ],
  },
  {
    id: 4,
    nom: "Gants en nitrile",
    categorie: "Protection des mains",
    description:
      "Gants jetables en nitrile pour la protection contre les produits chimiques.",
    fournisseur: "SafeHands",
    equipements: [
      { id: 107, nom: "Résistants aux produits chimiques" },
      { id: 108, nom: "Confortable" },
    ],
  },
  {
    id: 5,
    nom: "Chaussures de sécurité",
    categorie: "Protection des pieds",
    description:
      "Chaussures renforcées avec embout en acier pour protéger les pieds des chocs et des écrasements.",
    fournisseur: "SafeFeet",
    equipements: [
      { id: 109, nom: "Semelle antidérapante" },
      { id: 110, nom: "Coque acier" },
    ],
  },
  {
    id: 6,
    nom: "Bottes de sécurité",
    categorie: "Protection des pieds",
    description:
      "Bottes offrant une protection supplémentaire contre les dangers liés à l'environnement (eau, produits chimiques, etc.).",
    fournisseur: "ProtectBoots",
    equipements: [
      { id: 111, nom: "Imperméables" },
      { id: 112, nom: "Antidérapantes" },
    ],
  },
  {
    id: 7,
    nom: "Lunettes de sécurité",
    categorie: "Protection des yeux",
    description:
      "Lunettes conçues pour protéger les yeux contre les projections de poussière, de particules et de produits chimiques.",
    fournisseur: "VisionGuard",
    equipements: [
      { id: 113, nom: "Antibuée" },
      { id: 114, nom: "Confortables" },
    ],
  },
  {
    id: 8,
    nom: "Bouchons d'oreilles",
    categorie: "Protection auditive",
    description:
      "Dispositifs jetables ou réutilisables pour réduire l'exposition au bruit.",
    fournisseur: "QuietSound",
    equipements: [
      { id: 115, nom: "Réducteurs de bruit" },
      { id: 116, nom: "Confortables" },
    ],
  },
  {
    id: 9,
    nom: "Casques antibruit",
    categorie: "Protection auditive",
    description:
      "Casques complets ou serre-têtes protégeant contre les niveaux sonores élevés.",
    fournisseur: "SoundShield",
    equipements: [
      { id: 117, nom: "Réducteurs de bruit" },
      { id: 118, nom: "Confortable et réglable" },
    ],
  },
  {
    id: 10,
    nom: "Masques de protection",
    categorie: "Protection respiratoire",
    description:
      "Masques jetables ou réutilisables pour protéger contre les poussières, les gaz ou les vapeurs.",
    fournisseur: "AirSafe",
    equipements: [
      { id: 119, nom: "Confortable" },
      { id: 120, nom: "Filtrant" },
    ],
  },
  {
    id: 11,
    nom: "Harnais de sécurité",
    categorie: "Protection contre les chutes",
    description:
      "Dispositifs utilisés pour protéger les travailleurs en hauteur en les reliant à un point d'ancrage sécurisé.",
    fournisseur: "SafeClimb",
    equipements: [
      { id: 121, nom: "Réglable" },
      { id: 122, nom: "Confortable" },
    ],
  },
  {
    id: 12,
    nom: "Cordes de sécurité",
    categorie: "Protection contre les chutes",
    description:
      "Câbles robustes utilisés pour empêcher les chutes lors de travaux en hauteur.",
    fournisseur: "ClimbSafe",
    equipements: [
      { id: 123, nom: "Résistantes" },
      { id: 124, nom: "Réglables" },
    ],
  },
  {
    id: 13,
    nom: "Vêtements ignifugés",
    categorie: "Protection thermique",
    description:
      "Vêtements spécialement conçus pour résister à des températures élevées ou des flammes.",
    fournisseur: "HeatGuard",
    equipements: [
      { id: 125, nom: "Résistants à la chaleur" },
      { id: 126, nom: "Confortables" },
    ],
  },
];

export default function ProduitsList() {
  const [produits] = useState(produitsData);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  // Filtrage des produits selon le terme de recherche
  const filteredProduits = produits.filter(
    (produit) =>
      produit.nom.toLowerCase().includes(searchTerm.toLowerCase()) ||
      produit.categorie.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcul de l'index de début et de fin pour la pagination
  const indexOfLastProduit = currentPage * itemsPerPage;
  const indexOfFirstProduit = indexOfLastProduit - itemsPerPage;
  const currentProduits = filteredProduits.slice(
    indexOfFirstProduit,
    indexOfLastProduit
  );

  // Changement de page
  const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Liste des Produits</h1>

      {/* Champ de recherche */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Rechercher un produit ou une catégorie..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="p-2 border rounded-md w-full"
        />
      </div>

      {/* Liste des produits */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentProduits.map((produit) => (
          <div
            key={produit.id}
            className="p-4 border rounded-lg shadow-md bg-white transition-all hover:shadow-lg"
          >
           
            <h2 className="text-lg font-semibold">{produit.nom}</h2>
            <p className="text-sm text-gray-500">
              Catégorie: {produit.categorie}
            </p>
            <p className="mt-2 text-gray-700">
              Description: {produit.description}
            </p>
            <p className="mt-2 text-gray-600 font-medium">
              Fournisseur: {produit.fournisseur}
            </p>
            <p className="mt-2 text-gray-600 font-medium">
              Équipements inclus:
            </p>
            <ul className="list-disc list-inside text-gray-700">
              {produit.equipements.map((equipement) => (
                <li key={equipement.id}>{equipement.nom}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-4 py-2 bg-gray-300 rounded-md mr-2 disabled:opacity-50"
        >
          Précédent
        </button>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage * itemsPerPage >= filteredProduits.length}
          className="px-4 py-2 bg-gray-300 rounded-md disabled:opacity-50"
        >
          Suivant
        </button>
      </div>
    </div>
  );
}
