const express = require("express");
const {
  getRibsAtner,
  getRibCountAtner,
  createRibsAtner,
  updateRibsAtner,
  getOneRibAtnerById,
  getRibAtnerValid,
} = require("../controllers/ribAtner");
const router = express.Router();

router.get("/ribAtner", getRibCountAtner, getRibsAtner);
router.post("/ribAtner", createRibsAtner);
router.put("/ribAtner/:id", updateRibsAtner);
router.get("/ribAtner/:id", getOneRibAtnerById);

router.get("/ribatnerValid/:id", getRibAtnerValid);
module.exports = router;
