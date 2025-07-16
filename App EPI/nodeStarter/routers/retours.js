const express = require("express");
const {
  getRetours,
  createRetour,
  updateRetour,
  getOneRetourById,
  deleteRetour
} = require("../controllers/retours");
const router = express.Router();

router.get("/retours", getRetours);
router.post("/retours", createRetour);
router.put("/retours/:id", updateRetour);
router.get("/retours/:id", getOneRetourById);
router.delete("/retours/:id", deleteRetour);

module.exports = router;
