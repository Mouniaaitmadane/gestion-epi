const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");

// CORS middleware for handling Cross-Origin Resource Sharing
app.use(
  cors({
    origin: "*", // Allow requests from any origin (you might want to restrict this in production)
    methods: ["GET", "PUT", "POST", "DELETE"], // Allow these HTTP methods
    allowedHeaders: ["Content-Type", "Authorization", "Range"], // Allow these headers in the request
    exposedHeaders: ["Content-Range", "X-Content-Range"], // Allow these headers to be exposed
    credentials: true, // Allow credentials to be sent with requests (e.g., cookies)
  })
);

// Morgan middleware for logging HTTP requests
app.use(morgan("dev"));

// Body parser middleware (included in Express) for parsing application/json
app.use(express.json());

// Body parser middleware (included in Express) for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Cookie parser middleware for parsing cookies attached to the request
app.use(cookieParser());

// Import routes for different entities
// const ribAtner = require("./routers/ribAtner");
const produits = require("./routers/produits");
const dotations = require("./routers/dotations");
const employes = require("./routers/employes");
const equipements = require("./routers/equipements");
const utilisateurs = require("./routers/utilisateurs");
const retours = require("./routers/retours");

// Use the imported routes
app.use("/", produits);
app.use("/", dotations);
app.use("/", employes);
app.use("/", equipements);
app.use("/", utilisateurs);
app.use("/", retours);

// Catch-all route for undefined routes
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// Global error handler middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Internal Server Error" });
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Node API listening on port: ${port}`);
});
