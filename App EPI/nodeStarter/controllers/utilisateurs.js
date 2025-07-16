const { getConnection, getSql } = require("../database/connection"); // Importing database connection functions
const { utilisateurs } = require("../database/utilisateursQuerys"); // Importing utilisateur queries from database/utilisateurQuerys

// Retrieves all utilisateur records
exports.getUtilisateurs = async (req, res) => {
  try {
    let range = req.query.range || "[0,9]"; // Default range if not provided
    let sort = req.query.sort || '["id_utilisateur", "ASC"]'; // Default sort if not provided
    let filter = req.query.filter || "{}"; // Default filter if not provided

    range = JSON.parse(range); // Parsing range parameter
    sort = JSON.parse(sort); // Parsing sort parameter
    filter = JSON.parse(filter); // Parsing filter parameter

    console.log(filter); // Logging filter to console

    let queryFilter = "";
    if (filter.nomUtilisateur) {
      queryFilter += ` and nom_utilisateur like('%${filter.nomUtilisateur}%')`;
    }
    if (filter.role) {
      queryFilter += ` and role like('%${filter.role}%')`;
    }

    const pool = await getConnection();
    console.log(`${utilisateurs.getAll} ${queryFilter} Order by ${sort[0]} ${sort[1]}
        OFFSET ${range[0]} ROWS FETCH NEXT ${range[1] + 1 - range[0]} ROWS ONLY`);

    const result = await pool.request().query(
      `${utilisateurs.getAll} ${queryFilter} Order by ${sort[0]} ${sort[1]}
        OFFSET ${range[0]} ROWS FETCH NEXT ${range[1] + 1 - range[0]} ROWS ONLY`
    );

    res.set("Content-Range", `utilisateurs ${range[0]}-${range[1] + 1 - range[0]}/${req.count}`);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// Creates a new utilisateur record
exports.createUtilisateur = async (req, res) => {
  const { nomUtilisateur, motDePasse, role } = req.body;

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nomUtilisateur", getSql().VarChar, nomUtilisateur)
      .input("motDePasse", getSql().VarChar, motDePasse)
      .input("role", getSql().VarChar, role)
      .query(utilisateurQuerys.create);

    res.json({
      id: "",
      nomUtilisateur,
      motDePasse,
      role,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// Updates an existing utilisateur record
exports.updateUtilisateur = async (req, res) => {
  const { nomUtilisateur, motDePasse, role } = req.body;
  if (nomUtilisateur == null || motDePasse == null || role == null) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("nomUtilisateur", getSql().VarChar, nomUtilisateur)
      .input("motDePasse", getSql().VarChar, motDePasse)
      .input("role", getSql().VarChar, role)
      .input("id", getSql().Int, req.params.id)
      .query(utilisateurs.update);

    res.json({
      nomUtilisateur,
      motDePasse,
      role,
      id: req.params.id,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// Retrieves a single utilisateur by id
exports.getOneUtilisateurById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", getSql().Int, req.params.id)
      .query(utilisateursQuerys.getOne);

    res.set("Content-Range", `utilisateurs 0-1/1`);
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// Deletes an utilisateur record by id
exports.deleteUtilisateur = async (req, res) => {
  try {
    const pool = await getConnection();
    await pool.request().input("id", getSql().Int, req.params.id).query(utilisateurs.delete);
    res.status(204).send(); // Responding with no content status
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
