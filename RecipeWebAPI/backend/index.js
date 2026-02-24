require("dotenv").config();
const app = require("./app");
const databaseHelpers = require("./helpers/database.js");

const port = process.env.PORT || 3000;

// Testing database connection
databaseHelpers.testConnection();

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});