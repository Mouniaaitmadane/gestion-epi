const express = require("express");
const {
  getEquipements,
  createEquipement,
  updateEquipement,
  getEquipementById,
  deleteEquipement
} = require("../controllers/equipements");
const router = express.Router();

router.get("/equipements", getEquipements);
router.post("/equipements", createEquipement);
router.put("/equipements/:id", updateEquipement);
router.get("/equipements/:id", getEquipementById);
router.delete("/equipements/:id", deleteEquipement);

module.exports = router;
