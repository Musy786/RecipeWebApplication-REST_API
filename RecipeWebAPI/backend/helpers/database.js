const mysql = require("promise-mysql");
const info = require("../config");

// Execution of SQL query against database
exports.run_query = async function run_query(query, values) {
    try {
        const connection = await mysql.createConnection(info.getConfig());
        let data = await connection.query(query, values);
        await connection.end()
        return data;
    }
    catch (error) {
        console.error("Database query error details: ", error.message, "Query: ", query, "Values: ", values);   //For us
        throw "Database query error";   //For the user
    }
};

// Test connection to Database
exports.testConnection = async function testConnection() {
    try {
        const connection = await mysql.createConnection(info.getConfig());
        console.log("Connected to MySQL database");
        await connection.end();
    }
    catch (err) {
        console.error("Database connection failed: ", err.message);
    }
};