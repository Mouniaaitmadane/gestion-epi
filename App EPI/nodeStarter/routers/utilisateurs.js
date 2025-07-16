const express = require("express");
const {
  getUtilisateurs,
  createUtilisateur,
  updateUtilisateur,
  getOneUtilisateurById,
  deleteUtilisateur
} = require("../controllers/utilisateurs"); 
const router = express.Router();

router.get("/utilisateurs", getUtilisateurs);
router.post("/utilisateurs", createUtilisateur);
router.put("/utilisateurs/:id", updateUtilisateur);
router.get("/utilisateurs/:id", getOneUtilisateurById);
router.delete("/utilisateurs/:id", deleteUtilisateur);

module.exports = router;
