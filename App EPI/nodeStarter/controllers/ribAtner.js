const { getConnection, getSql } = require("../database/connection"); // Importing getConnection and getSql functions from database/connection
const { ribAtner } = require("../database/querys"); // Importing ribAtner queries from database/querys

// Retrieves the count of records in the DAF_RIB_ATNER table
exports.getRibCountAtner = async (req, res, next) => {
  try {
    const pool = await getConnection(); // Establishing a database connection
    const result = await pool.request().query(ribAtner.getCount); // Executing query to get record count

    req.count = result.recordset[0].count; // Storing count in req for future reference
    console.log(req.count); // Logging the count to console
    // res.json({ count: res.conut });
    next(); // Proceeding to the next middleware
  } catch (error) {
    res.status(500); // Setting HTTP status to 500 for internal server error
    console.log(error.message); // Logging error message to console
    res.send(error.message); // Sending error message as response
  }
};

// Retrieves a list of records from DAF_RIB_ATNER table based on query parameters
exports.getRibsAtner = async (req, res) => {
  try {
    let range = req.query.range || "[0,9]"; // Default range if not provided
    let sort = req.query.sort || '["id" , "ASC"]'; // Default sort if not provided
    let filter = req.query.filter || "{}"; // Default filter if not provided

    range = JSON.parse(range); // Parsing range parameter
    sort = JSON.parse(sort); // Parsing sort parameter
    filter = JSON.parse(filter); // Parsing filter parameter

    console.log(filter); // Logging filter to console

    let queryFilter = "";
    if (filter.nom) {
      queryFilter += ` and nom like('%${filter.nom}%')`; // Adding filter condition for 'nom'
    }
    if (filter.rib) {
      queryFilter += ` and rib like('%${filter.rib}%')`; // Adding filter condition for 'rib'
    }

    const pool = await getConnection(); // Establishing a database connection
    console.log(`${ribAtner.getAll} ${queryFilter} Order by ${sort[0]} ${
      sort[1]
    }
        OFFSET ${range[0]} ROWS FETCH NEXT ${
      range[1] + 1 - range[0]
    } ROWS ONLY`); // Logging SQL query with parameters
    const result = await pool.request().query(
      `${ribAtner.getAll} ${queryFilter} Order by ${sort[0]} ${sort[1]}
        OFFSET ${range[0]} ROWS FETCH NEXT ${range[1] + 1 - range[0]} ROWS ONLY`
    ); // Executing query to retrieve records

    res.set(
      "Content-Range",
      `ribAtner ${range[0]}-${range[1] + 1 - range[0]}/${req.count}`
    ); // Setting Content-Range header

    res.json(result.recordset); // Sending JSON response with retrieved records
  } catch (error) {
    res.send(error.message); // Sending error message as response
    res.status(500); // Setting HTTP status to 500 for internal server error
  }
};
 
// Creates a new record in the DAF_RIB_ATNER table
exports.createRibsAtner = async (req, res) => {
  const { nom, rib, Redacteur } = req.body; // Destructuring request body

  try {
    const pool = await getConnection(); // Establishing a database connection

    await pool
      .request()
      .input("nom", getSql().VarChar, nom) // Setting input parameters for 'nom'
      .input("rib", getSql().VarChar, rib) // Setting input parameters for 'rib'
      .input("Redacteur", getSql().VarChar, Redacteur) // Setting input parameters for 'Redacteur'
      .query(ribAtner.create); // Executing query to create new record

    console.log("errour"); // Logging success message to console
    res.json({
      id: "", // Placeholder for id
      nom,
      rib,
      Redacteur,
    }); // Sending JSON response with created record details
  } catch (error) {
    res.status(500); // Setting HTTP status to 500 for internal server error
    res.send(error.message); // Sending error message as response
  }
};

// Updates an existing record in the DAF_RIB_ATNER table
exports.updateRibsAtner = async (req, res) => {
  const { nom, rib, ModifierPar } = req.body; // Destructuring request body
  if (nom == null || rib == null || ModifierPar == null) {
    return res.status(400).json({ error: "all field is required" }); // Checking for required fields
  }
  try {
    const pool = await getConnection(); // Establishing a database connection

    await pool
      .request()
      .input("nom", getSql().VarChar, nom) // Setting input parameters for 'nom'
      .input("rib", getSql().VarChar, rib) // Setting input parameters for 'rib'
      .input("ModifierPar", getSql().VarChar, ModifierPar) // Setting input parameters for 'ModifierPar'
      .input("id", getSql().Int, req.params.id) // Setting input parameters for 'id'
      .query(ribAtner.update); // Executing query to update record

    res.json({
      nom,
      rib,
      ModifierPar,
      id: req.params.id,
    }); // Sending JSON response with updated record details
  } catch (error) {
    res.status(500); // Setting HTTP status to 500 for internal server error
    res.send(error.message); // Sending error message as response
  }
};

// Retrieves a single record from DAF_RIB_ATNER table based on id
exports.getOneRibAtnerById = async (req, res) => {
  try {
    const pool = await getConnection(); // Establishing a database connection
    const result = await pool
      .request()
      .input("id", getSql().Int, req.params.id) // Setting input parameter for 'id'
      .query(ribAtner.getOne); // Executing query to retrieve single record

    res.set("Content-Range", `ribAtner 0-1/1`); // Setting Content-Range header

    res.json(result.recordset[0]); // Sending JSON response with retrieved record
  } catch (error) {
    res.send(error.message); // Sending error message as response
    res.status(500); // Setting HTTP status to 500 for internal server error
  }
};

// Retrieves valid records from DAF_RIB_ATNER table for virement operations
exports.getRibAtnerValid = async (req, res) => {
  try {
    const pool = await getConnection(); // Establishing a database connection
    const result = await pool
      .request()
      .input("id", getSql().VarChar, req.params.id) // Setting input parameter for 'id'
      .query(ribAtner.getRibAtnerValid); // Executing query to retrieve valid records

    res.set("Content-Range", `ordervirementsFond 0-1/1`); // Setting Content-Range header

    res.json(result.recordset); // Sending JSON response with retrieved records
  } catch (error) {
    res.send(error.message); // Sending error message as response
    res.status(500); // Setting HTTP status to 500 for internal server error
  }
};
