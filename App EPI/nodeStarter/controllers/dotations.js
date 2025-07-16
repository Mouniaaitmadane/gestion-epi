const { getConnection } = require("../database/connection"); // Importing database connection functions
const { dotations } = require("../database/dotationsQuerys"); // Importing dotations queries

// Retrieves all dotation records
exports.getDotations = async (req, res) => {
  try {
    let range = req.query.range || "[0,9]"; // Default range if not provided
    let sort = req.query.sort || '["id_dotation", "ASC"]'; // Default sort if not provided
    let filter = req.query.filter || "{}"; // Default filter if not provided

    range = JSON.parse(range);
    sort = JSON.parse(sort);
    filter = JSON.parse(filter);

    let queryFilter = "";
    if (filter.idEmployee) {
      queryFilter += ` AND id_employee = ${filter.idEmployee}`;
    }
    if (filter.idEquipement) {
      queryFilter += ` AND id_equipement = ${filter.idEquipement}`;
    }
    if (filter.dateDotation) {
      queryFilter += ` AND date_dotation = '${filter.dateDotation}'`;
    }
    if (filter.quantite) {
      queryFilter += ` AND quantite = ${filter.quantite}`;
    }

    const pool = await getConnection();
    const query = `${dotations.getAll} ${queryFilter} ORDER BY ${sort[0]} ${sort[1]} OFFSET ${range[0]} ROWS FETCH NEXT ${range[1] + 1 - range[0]} ROWS ONLY`;

    const result = await pool.request().query(query);

    res.set("Content-Range", `dotations ${range[0]}-${range[1]}/${result.recordset.length}`);
    res.json(result.recordset);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// Creates a new dotation record
exports.createDotation = async (req, res) => {
  const { idEmployee, idEquipement, dateDotation, quantite } = req.body;

  if (!idEmployee || !idEquipement || !dateDotation || !quantite) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("idEmployee", sql.Int, idEmployee)
      .input("idEquipement", sql.Int, idEquipement)
      .input("dateDotation", sql.Date, dateDotation)
      .input("quantite", sql.Int, quantite)
      .query(dotations.create);

    res.status(201).json({ idEmployee, idEquipement, dateDotation, quantite });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// Updates an existing dotation record
exports.updateDotation = async (req, res) => {
  const { idEmployee, idEquipement, dateDotation, quantite } = req.body;

  if (idEmployee == null || idEquipement == null || dateDotation == null || quantite == null) {
    return res.status(400).json({ error: "Tous les champs sont requis." });
  }

  try {
    const pool = await getConnection();

    await pool
      .request()
      .input("idEmployee", sql.Int, idEmployee)
      .input("idEquipement", sql.Int, idEquipement)
      .input("dateDotation", sql.Date, dateDotation)
      .input("quantite", sql.Int, quantite)
      .input("id", sql.Int, req.params.id)
      .query(dotations.update);

    res.json({ idEmployee, idEquipement, dateDotation, quantite, id: req.params.id });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// Retrieves a single dotation by id
exports.getOneDotationById = async (req, res) => {
  try {
    const pool = await getConnection();
    const result = await pool
      .request()
      .input("id", sql.Int, req.params.id)
      .query(dotations.getOne);

    if (!result.recordset.length) {
      return res.status(404).json({ error: "Dotation non trouvée." });
    }

    res.set("Content-Range", `dotations 0-1/1`);
    res.json(result.recordset[0]);
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};

// Deletes a dotation record by id
exports.deleteDotation = async (req, res) => {
  try {
    const pool = await getConnection();
    await pool.request().input("id", sql.Int, req.params.id).query(dotations.delete);
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
};