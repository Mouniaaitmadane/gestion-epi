const { getConnection, getSql } = require("../database/connection"); // Importing database connection functions
const { retours } = require("../database/retoursQuerys"); // Importing retours queries from database/retoursQuerys

// Retrieves all retour records
exports.getRetours = async (req, res) => {
  try {
    let range = req.query.range || "[0,9]"; // Default range if not provided
    let sort = req.query.sort || '["id_retour", "ASC"]'; // Default sort if not provided
    let filter = req.query.filter || "{}"; // Default filter if not provided

    range = JSON.parse(range); // Parsing range parameter
    sort = JSON.parse(sort); // Parsing sort parameter
    filter = JSON.parse(filter); // Parsing filter parameter

    console.log(filter); // Logging filter to console

    let queryFilter = "";
    if (filter.id_employe) {
      queryFilter += ` and id_employe = ${filter.id_employe}`;
    }
    if (filter.id_equipement) {
      queryFilter += ` and id_equipement = ${filter.id_equipement}`;
    }
    if (filter.date_retour) {
      queryFilter += ` and date_retour = '${filter.date_retour}'`;
    }
    if (filter.quantite_retournee) {
      queryFilter += ` and quantite_retournee = ${filter.quantite_retournee}`;
    }

    const pool = await getConnection();
    console.log(`${retours.getAll} ${queryFilter} Order by ${sort[0]} ${sort[1]}
        OFFSET ${range[0]} ROWS FETCH NEXT ${range[1] + 1 - range[0]} ROWS ONLY`);

    const result = await pool.request().query(
      `${retours.getAll} ${queryFilter} Order by ${sort[0]} ${sort[1]}
        OFFSET ${range[0]} ROWS FETCH NEXT ${range[1] + 1 - range[0]} ROWS ONLY`
    );

    res.set("Content-Range", `retours ${range[0]}-${range[1] + 1 - range[0]}/${req.count}`);
    res.json(result.recordset);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// Creates a new retour record
exports.createRetour = async (req, res) => {
  const { id_employe, id_equipement, date_retour, quantite_retournee } = req.body;

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("id_employe", getSql().Int, id_employe)
      .input("id_equipement", getSql().Int, id_equipement)
      .input("date_retour", getSql().Date, date_retour)
      .input("quantite_retournee", getSql().Int, quantite_retournee)
      .query(retours.create);

    res.json({
      id_employe,
      id_equipement,
      date_retour,
      quantite_retournee,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// Updates an existing retour record
exports.updateRetour = async (req, res) => {
  const { id_employe, id_equipement, date_retour, quantite_retournee } = req.body;
  if (id_employe == null || id_equipement == null || date_retour == null || quantite_retournee == null) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("id_employe", getSql().Int, id_employe)
      .input("id_equipement", getSql().Int, id_equipement)
      .input("date_retour", getSql().Date, date_retour)
      .input("quantite_retournee", getSql().Int, quantite_retournee)
      .input("id", getSql().Int, req.params.id)
      .query(retours.update);

    res.json({
      id_employe,
      id_equipement,
      date_retour,
      quantite_retournee,
      id: req.params.id,
    });
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// Retrieves a single retour by id
exports.getOneRetourById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", getSql().Int, req.params.id)
      .query(retours.getOne);

    res.set("Content-Range", `retours 0-1/1`);
    res.json(result.recordset[0]);
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};

// Deletes a retour record by id
exports.deleteRetour = async (req, res) => {
  try {
    const pool = await getConnection();
    await pool.request().input("id", getSql().Int, req.params.id).query(retours.delete);
    res.status(204).send(); // Responding with no content status
  } catch (error) {
    res.status(500);
    res.send(error.message);
  }
};
