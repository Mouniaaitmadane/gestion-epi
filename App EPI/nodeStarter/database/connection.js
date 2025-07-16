const sql = require("mssql/msnodesqlv8");

const connectionString = "Driver={ODBC Driver 18 for SQL Server};Server=DESKTOP-K9C0GC7\\MSSQLSERVER1;Database=gestionEPI;Trusted_Connection=Yes;Encrypt=Yes;TrustServerCertificate=Yes;";


const getConnection = async () => {
  try {
    const pool = await sql.connect({ connectionString });
    console.log("Database connection successful.");
    return pool;
  } catch (error) {
    console.error("Database connection error:", error);
    throw error;
  }
};

module.exports = {
  getConnection,
  sql,
};
