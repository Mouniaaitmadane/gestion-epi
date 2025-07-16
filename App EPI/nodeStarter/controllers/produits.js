const { getConnection, sql } = require("../database/connection");
const { produits } = require("../database/produitsQuerys");

// Récupération de tous les produits
exports.getProduits = async (req, res) => {
  try {
    const pool = await getConnection();
    console.log(produits.getAll);
    const result = await pool.request().query(produits.getAll);

    res.json(result.recordset);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

// Création d'un nouveau produit
exports.createProduit = async (req, res) => {
  const {nomProduit, categorie, description } = req.body;

  if (!nomProduit|| !categorie || !description) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nomProduit", sql.VarChar, nomProduit)
      .input("categorie", sql.VarChar, categorie)
      .input("description", sql.VarChar, description)
      .input("fournisseur", sql.VarChar, fournisseur)
      .query(produits.create);

      res.json({
        nomProduit,
        categorie,
        description ,
        fournisseur
      });
    } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

// Mise à jour d'un produit existant
exports.updateProduit = async (req, res) => {
  const {nomProduit, categorie, updatedBy } = req.body;

  if (!nomProduit || !categorie || !updatedBy) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nomProduit", sql.VarChar, nomProduit)
      .input("categorie", sql.VarChar, categorie)
      .input("updatedBy", sql.VarChar, updatedBy)
      .input("id", sql.Int, req.params.id)
      .query(produits.update);

    res.json({ id: req.params.id,nomProduit, categorie, updatedBy });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

// Suppression d'un produit
exports.deleteProduit = async (req, res) => {
  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query(produits.delete);

    res.json({ message: "Produit supprimé avec succès." });
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};

// Récupération d'un produit par son ID
exports.getProduitById = async (req, res) => {
  try {
    const pool = await getConnection();

    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query(produits.getOne);

    if (!result.recordset.length) {
      return res.status(404).json({ error: "Produit non trouvé." });
    }

    res.json(result.recordset[0]);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
};
