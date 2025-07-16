const express = require("express");
const {
  getProduits,
  createProduit,
  updateProduit,
  getProduitById ,
  deleteProduit
} = require("../controllers/produits");
const router = express.Router();

router.get("/produits", getProduits);
router.post("/produits", createProduit);
// router.put("/produits/:id", updateProduit);
// router.get("/produits/:id", getProduitById );
// router.delete("/produits/:id", deleteProduit);

module.exports = router;
