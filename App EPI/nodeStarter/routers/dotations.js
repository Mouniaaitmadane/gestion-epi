const express = require("express");
const {
  getDotations,
  createDotation,
  updateDotation,
  getOneDotationById,
  deleteDotation
} = require("../controllers/dotations");
const router = express.Router();

router.get("/dotations", getDotations);
router.post("/dotations", createDotation);
router.put("/dotations/:id", updateDotation);
router.get("/dotations/:id", getOneDotationById);
router.delete("/dotations/:id", deleteDotation);

module.exports = router;
