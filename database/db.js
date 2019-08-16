const Sequelize = require("sequelize");
const databaseName = "authorize-backend";

console.log("Opening database connection");

const db = new Sequelize(`postgres://localhost:5432/${databaseName}`, { logging: false });

module.exports = db;