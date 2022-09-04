import dotenv from "dotenv";
dotenv.config();
import { Sequelize, DataTypes } from "sequelize";
import Book from "./Book.js";
import Author from "./Author.js";


const db = {};

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected ...");
  })
  .catch((err) => {
    console.log("Error", err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.Book = Book(sequelize, DataTypes);
db.Author = Author(sequelize, DataTypes);

db.Book.belongsTo(db.Author);
db.Author.hasMany(db.Book);

export default db;