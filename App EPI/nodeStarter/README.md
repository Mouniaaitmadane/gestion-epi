# `/ribsatner/` REST API Endpoint

This repository hosts a RESTful API designed to manage RIBs (Relevé d'Identité Bancaire) for ATNER (example organization). Below is an overview of the `/ribsatner/` endpoint and its functionalities.

## Endpoint Description

The `/ribsatner/` endpoint provides operations to retrieve, create, update, and validate RIB records within the ATNER system.

### Available Operations

- **GET `/ribsatner/count`**
  - **Description:** Retrieves the total count of RIB records.
  - **Usage:** Provides the total number of RIB records available in the database.

- **GET `/ribsatner`**
  - **Description:** Retrieves a list of RIB records based on specified parameters.
  - **Parameters:**
    - `range`: Specifies the range of records to retrieve (e.g., `[0,9]`).
    - `sort`: Specifies the sorting criteria (e.g., `["id", "ASC"]`).
    - `filter`: Specifies filtering criteria as JSON object (e.g., `{"nom": "example"}`).
  - **Usage:** Allows clients to fetch a subset of RIB records based on pagination, sorting, and filtering.

- **POST `/ribsatner`**
  - **Description:** Creates a new RIB record.
  - **Body Parameters:**
    - `nom`: Name associated with the RIB.
    - `rib`: RIB number.
    - `Redacteur`: Editor responsible for creating the RIB.
  - **Usage:** Enables clients to add a new RIB record to the database.

- **PUT `/ribsatner/:id`**
  - **Description:** Updates an existing RIB record identified by `:id`.
  - **Parameters:**
    - `id`: Identifier of the RIB record to update.
  - **Body Parameters:**
    - `nom`: Updated name associated with the RIB.
    - `rib`: Updated RIB number.
    - `ModifierPar`: Editor responsible for updating the RIB.
  - **Usage:** Allows clients to modify an existing RIB record.

- **GET `/ribsatner/:id`**
  - **Description:** Retrieves a specific RIB record identified by `:id`.
  - **Parameters:**
    - `id`: Identifier of the RIB record to retrieve.
  - **Usage:** Fetches details of a single RIB record based on its unique identifier.

- **GET `/ribsatner/valid/:id`**
  - **Description:** Retrieves valid RIB records for virement operations associated with a specific identifier.
  - **Parameters:**
    - `id`: Identifier used to filter valid RIB records.
  - **Usage:** Returns RIB records that are valid for financial transfer operations.

## Getting Started

To get started with this API, follow these steps:

1. Clone the repository:
    git clone https://github.com/atner-stg/nodeStarter.git
    cd repository
2. Install dependencies:
    npm install
3. Configure database connection:
- Update database settings in `database/connection.js` as per your environment.

4. Start the server:
npm start
## Technologies Used

- Node.js
- Express.js
- mssql (Microsoft SQL Server client for Node.js)