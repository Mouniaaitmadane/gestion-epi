const { getConnection } = require("../database/connection");
const  equipementQuerys  = require("../database/equipementQuerys");
const sql = require("mssql/msnodesqlv8");

// Récupération de tous les équipements
exports.getEquipements = async (req, res) => {
  try {
    let range = req.query.range || "[0,100]";
    let sort = req.query.sort || '["id_equipement", "ASC"]';
    let filter = req.query.filter || "{}";

    range = JSON.parse(range);
    sort = JSON.parse(sort);
    filter = JSON.parse(filter);

    console.log("Filter applied:", filter);

    let queryFilter = "";
    if (filter.nomEquipement)
      queryFilter += ` AND nomEquipement LIKE '%${filter.nomEquipement}%'`;
    if (filter.idProduit)
      queryFilter += ` AND idProduit LIKE '%${filter.idProduit}%'`;
    if (filter.categorie)
      queryFilter += ` AND categorie LIKE '%${filter.categorie}%'`;
    if (filter.quantiteStock)
      queryFilter += ` AND quantiteStock LIKE '%${filter.quantiteStock}%'`;

    const pool = await getConnection();

    const result = await pool
      .request()
      .query(
        `${equipementQuerys.equipements.getAll} ${queryFilter} ORDER BY ${
          sort[0]
        } ${sort[1]} OFFSET ${range[0]} ROWS FETCH NEXT ${
          range[1] + 1 - range[0]
        } ROWS ONLY`
      );
    res.set(
      "Content-Range",
      `equipement ${range[0]}-${range[1] + 1 - range[0]}/${req.count}`
    );
    res.json(result.recordset);
  } catch (error) {
    console.error("Erreur lors de la récupération des equipement:", error);
    res.status(500).json({
      error: "Une erreur est survenue lors de la récupération des equipement.",
    });
  }
};

// Validation des données de l'équipement
const validateEquipementData = (data) => {
  const { nomEquipement, idProduit, categorie, quantiteStock } = data;
  if (!nomEquipement || !idProduit || !categorie || !quantiteStock) {
    return "Tous les champs sont obligatoires.";
  }
  return null;
};

// Création d'un nouvel équipement
exports.createEquipement = async (req, res) => {
  const { nomEquipement, idProduit, categorie, quantiteStock } = req.body;
  console.log("req--------------------", req.body);
  // Validation des données
  const error = validateEquipementData(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  try {
    const pool = await getConnection();

    // Vérification si un équipement avec le même nom existe déjà
    const result = await pool
      .request()
      .input("nomEquipement", sql.VarChar, nomEquipement)
      .query(
        "SELECT COUNT(*) AS count FROM [dbo].[equipements] WHERE nom_equipement = @nomEquipement"
      );

    if (result.recordset[0].count > 0) {
      return res
        .status(400)
        .json({ error: "Il existe déjà un équipement avec ce nom." });
    }

    // Insertion d'un nouvel équipement
    await pool
      .request()
      .input("nomEquipement", sql.VarChar, nomEquipement)
      .input("idProduit", sql.Int, idProduit)
      .input("categorie", sql.VarChar, categorie)
      .input("quantiteStock", sql.Int, quantiteStock)
      .query(equipementQuerys.equipements.create);

    res.status(200).json({
      message: "Equipement créé avec succès",
      equipement: { nomEquipement, idProduit, categorie, quantiteStock },
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'équipement:", error);
    res.status(500).json({ error: "Une erreur interne est survenue." });
  }
};

// Mise à jour d'un équipement existant
exports.updateEquipement = async (req, res) => {
  const { nomEquipement, idProduit, categorie, quantiteStock } = req.body;

  // Validation des données
  const error = validateEquipementData(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  try {
    const pool = await getConnection();

    // Mise à jour de l'équipement
    await pool
      .request()
      .input("nomEquipement", sql.NVarChar, nomEquipement)
      .input("idProduit", sql.Int, idProduit)
      .input("categorie", sql.NVarChar, categorie)
      .input("quantiteStock", sql.Int, quantiteStock)
      .input("id", sql.Int, req.params.id)
      .query(equipementQuerys.equipement.update);

    res.json({
      message: "Equipement mis à jour avec succès",
      equipement: {
        nomEquipement,
        idProduit,
        categorie,
        quantiteStock,
        id: req.params.id,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'équipement:", error);
    res.status(500).json({ error: "Une erreur interne est survenue." });
  }
};

// Suppression d'un équipement
exports.deleteEquipement = async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Tentative de suppression de l'équipement avec ID:", id);

    const pool = await getConnection();

    // Vérifie si l'ID existe avant suppression
    const result = await pool
      .request()
      .input("id", sql.Int, id)
      .query(
        "SELECT COUNT(*) AS count FROM [dbo].[equipements] WHERE id_equipement = @id"
      );

    if (result.recordset[0].count === 0) {
      return res.status(404).json({ error: "Équipement non trouvé." });
    }

    // Suppression de l'équipement
    await pool
      .request()
      .input("id", sql.Int, id)
      .query("DELETE FROM [dbo].[equipements] WHERE id_equipement = @id");

    console.log(`Équipement ID ${id} supprimé avec succès`);

    res.status(200).json({ message: "Équipement supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'équipement:", error);
    res
      .status(500)
      .json({ error: "Une erreur est survenue lors de la suppression." });
  }
};

// Récupération d'un équipement par son ID
exports.getEquipementById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query(equipementQuerys.equipement.getOne);

    if (!result.recordset[0]) {
      return res.status(404).json({ error: "Équipement non trouvé." });
    }

    res.set("Content-Range", `equipement 0-1/1`);
    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'équipement:", error);
    res.status(500).json({
      error: "Une erreur est survenue lors de la récupération de l'équipement.",
    });
  }
};
