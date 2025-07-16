const express = require("express");
const {
  getEmployes,
  createEmploye,
  updateEmploye,
  getOneEmployeById,
  deleteEmploye,
} = require("../controllers/employes");
const router = express.Router();

// Routes pour la gestion des employés
router.get("/employes", getEmployes); // Récupérer tous les employés
router.post("/employes", createEmploye); // Créer un employé
router.put("/employes/:id", updateEmploye); // Mettre à jour un employé
router.get("/employes/:id", getOneEmployeById); // Récupérer un employé par ID
router.delete("/employes/:cin", deleteEmploye); // Supprimer un employé

module.exports = router;
