import startApolloServer from "./utils/startApolloServer.js";
import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/types/index.js";
import db from "./models/index.js";

db.sequelize.sync({ force: false, logging: console.log }).then(() => {
  console.log("Database synced!!!");
});

startApolloServer(typeDefs, resolvers);