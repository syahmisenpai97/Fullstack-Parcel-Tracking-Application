import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const db = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    timezone: "+08:00",
  }
);

db.authenticate()
  .then(() => {
    console.log("Connection to MySQL established successfully.");
  })
  .catch((err) => {
    console.error("Unable to connect to MySQL:", err);
  });

export default db;
