import dotenv from "dotenv";
dotenv.config();
import { Sequelize, DataTypes } from "sequelize";
import Card from "./Card.js";
import Set from "./Set.js";


const db = {};

const sequelize = new Sequelize(
  'sqlite-db',
  'user',
  'pass',
  {
    host: './dev.sqlite',
    dialect: "sqlite",
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

db.Card = Card(sequelize, DataTypes);
db.Set = Set(sequelize, DataTypes);

db.Card.belongsTo(db.Set);
db.Set.hasMany(db.Card);

export default db;