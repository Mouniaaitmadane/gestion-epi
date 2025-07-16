const { getConnection } = require("../database/connection");
const employesQuerys = require("../database/employesQuerys");
const sql = require("mssql/msnodesqlv8");

// Retrieves all employe records
exports.getEmployes = async (req, res) => {
  try {
    let range = req.query.range || "[0,100]";
    let sort = req.query.sort || '["cin", "ASC"]';
    let filter = req.query.filter || "{}";

    range = JSON.parse(range);
    sort = JSON.parse(sort);
    filter = JSON.parse(filter);

    console.log("Filter applied:", filter);

    let queryFilter = "";
    if (filter.nom) queryFilter += ` AND nom LIKE '%${filter.nom}%'`;
    if (filter.prenom) queryFilter += ` AND prenom LIKE '%${filter.prenom}%'`;
    if (filter.fonction)
      queryFilter += ` AND fonction LIKE '%${filter.fonction}%'`;
    if (filter.cin) queryFilter += ` AND cin LIKE '%${filter.cin}%'`;
    if (filter.dateEmbauche)
      queryFilter += ` AND date_embauche = '${filter.dateEmbauche}'`;
    if (filter.dateDepart)
      queryFilter += ` AND date_depart = '${filter.dateDepart}'`;
    if (filter.taille) queryFilter += ` AND taille = ${filter.taille}`;

    const pool = await getConnection();
    const result = await pool
      .request()
      .query(
        `${employesQuerys.employes.getAll} ${queryFilter} ORDER BY ${sort[0]} ${
          sort[1]
        } OFFSET ${range[0]} ROWS FETCH NEXT ${
          range[1] + 1 - range[0]
        } ROWS ONLY`
      );

    res.set(
      "Content-Range",
      `employes ${range[0]}-${range[1] + 1 - range[0]}/${req.count}`
    );
    res.json(result.recordset);
  } catch (error) {
    console.error("Erreur lors de la récupération des employés:", error);
    res.status(500).json({
      error: "Une erreur est survenue lors de la récupération des employés.",
    });
  }
};

// Creates a new employe record
// Fonction de validation des données de l'employé
const validateEmployeData = (data) => {
  const {
    nom,
    prenom,
    fonction,
    cin,
    dateEmbauche,
    pointureChaussures,
    taille,
  } = data;
  if (
    !nom ||
    !prenom ||
    !fonction ||
    !cin ||
    !dateEmbauche ||
    !pointureChaussures ||
    !taille
  ) {
    return "Tous les champs sont obligatoires.";
  }
  return null;
};

// Créer un employé
exports.createEmploye = async (req, res) => {
  const {
    nom,
    prenom,
    fonction,
    cin,
    dateEmbauche,
    pointureChaussures,
    taille,
    dateDepart,
  } = req.body;
  console.log("req--------------------", req.body);
  // Validation des données
  const error = validateEmployeData(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  try {
    const pool = await getConnection();

    // Vérification si un employé avec le même CIN existe déjà
    const result = await pool
      .request()
      .input("cin", sql.VarChar, cin)
      .query("SELECT COUNT(*) AS count FROM [dbo].[employes] WHERE cin = @cin");

    if (result.recordset[0].count > 0) {
      return res
        .status(400)
        .json({ error: "Il existe déjà un employé avec ce CIN." });
    }

    // Insertion du nouvel employé
    await pool
      .request()
      .input("nom", sql.VarChar, nom)
      .input("prenom", sql.VarChar, prenom)
      .input("fonction", sql.VarChar, fonction)
      .input("cin", sql.VarChar, cin)
      .input("date_embauche", sql.Date, dateEmbauche)
      .input("pointure_chaussures", sql.Int, pointureChaussures)
      .input("taille", sql.VarChar, taille)
      .input("date_depart", sql.Date, dateDepart || null) // Date départ par défaut à null
      .query(employesQuerys.employes.create);

    res.status(200).json({
      message: "Employé créé avec succès",
      employe: {
        nom,
        prenom,
        fonction,
        cin,
        dateEmbauche,
        pointureChaussures,
        taille,
        dateDepart,
      },
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout de l'employé:", error);
    res.status(500).json({ error: "Une erreur interne est survenue." });
  }
};

// Mettre à jour un employé
exports.updateEmploye = async (req, res) => {
  const {
    nom,
    prenom,
    fonction,
    cin,
    dateEmbauche,
    pointureChaussures,
    taille,
    dateDepart,
  } = req.body;

  // Validation des données
  const error = validateEmployeData(req.body);
  if (error) {
    return res.status(400).json({ error });
  }

  try {
    const pool = await getConnection();

    // Mise à jour de l'employé
    await pool
      .request()
      .input("nom", sql.VarChar, nom)
      .input("prenom", sql.VarChar, prenom)
      .input("fonction", sql.VarChar, fonction)
      .input("cin", sql.VarChar, cin)
      .input("date_embauche", sql.Date, dateEmbauche)
      .input("pointure_chaussures", sql.Int, pointureChaussures)
      .input("taille", sql.Int, taille)
      .input("date_depart", sql.Date, dateDepart)
      .input("id", sql.Int, req.params.id)
      .query(employesQuerys.employes.update);

    res.json({
      message: "Employé mis à jour avec succès",
      employe: {
        nom,
        prenom,
        fonction,
        cin,
        dateEmbauche,
        pointureChaussures,
        taille,
        dateDepart,
        id: req.params.id,
      },
    });
  } catch (error) {
    console.error("Erreur lors de la mise à jour de l'employé:", error);
    res.status(500).json({ error: "Une erreur interne est survenue." });
  }
};

// Retrieves a single employe by id
exports.getOneEmployeById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query(employesQuerys.employes.getOne);

    if (!result.recordset[0]) {
      return res.status(404).json({ error: "Employé non trouvé." });
    }

    res.set("Content-Range", `employes 0-1/1`);
    res.json(result.recordset[0]);
  } catch (error) {
    console.error("Erreur lors de la récupération de l'employé:", error);
    res.status(500).json({
      error: "Une erreur est survenue lors de la récupération de l'employé.",
    });
  }
};

// Deletes an employe record by id
exports.deleteEmploye = async (req, res) => {
  try {
    const cin = req.params.cin;
    console.log("Tentative de suppression de l'employé avec cin:", cin);

    const pool = await getConnection();

    // Vérifie si l'cin existe avant suppression
    const result = await pool
      .request()
      .input("cin", sql.VarChar, cin)
      .query("SELECT COUNT(*) AS count FROM [dbo].[employes] WHERE cin = @cin");

    if (result.recordset[0].count === 0) {
      return res.status(404).json({ error: "Employé non trouvé." });
    }

    // Supprime l'employé
    await pool
      .request()
      .input("cin", sql.VarChar, cin)
      .query("DELETE FROM [dbo].[employes] WHERE cin = @cin");

    console.log(`Employé cin ${cin} supprimé avec succès`);

    res.status(200).json({ message: "Employé supprimé avec succès." });
  } catch (error) {
    console.error("Erreur lors de la suppression de l'employé:", error);
    res
      .status(500)
      .json({ error: "Une erreur est survenue lors de la suppression." });
  }
};
