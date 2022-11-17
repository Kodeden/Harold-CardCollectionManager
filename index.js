import startApolloServer from "./utils/startApolloServer.js";
import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/types/index.js";
import db from "./models/index.js";
import createServer from "./utils/startRestServer.js";

const REST_PORT = 4001;

db.sequelize.sync({ force: true, logging: console.log }).then(() => {
  console.log("Database synced!!!");
});

startApolloServer(typeDefs, resolvers);

const app = createServer();

app.listen(REST_PORT, () => {
  console.log(`Express Server listening on port ${REST_PORT}`);
});