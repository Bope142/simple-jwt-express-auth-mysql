const mysql = require("mysql2/promise");
const dotenv = require("dotenv");
const { Sequelize } = require("sequelize");

dotenv.config();

module.exports = db = {};

initialize();

async function initialize() {
  const connection = await mysql.createConnection(
    `mysql://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:3306/${process.env.DB_NAME}`
  );

  // connect to db
  const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    { dialect: "mysql" }
  );

  // init models and add them to the exported db object
  db.User = require("../models/User")(sequelize);

  // sync all models with database
  await sequelize.sync({ alter: true });
}
