import startApolloServer from "./utils/startApolloServer.js";
import resolvers from "./graphql/resolvers/index.js";
import typeDefs from "./graphql/types/index.js";
import db from "./models/index.js";
import createServer from "./utils/startRestServer.js";
import path from "path";

const REST_PORT = 4001;
const __dirname= path.resolve();

db.sequelize.sync({ force: false, logging: console.log }).then(() => {
  console.log("Database synced!!!");
});

startApolloServer(typeDefs, resolvers);

const app = createServer();

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

app.listen(REST_PORT, () => {
  console.log(`Express Server listening on port ${REST_PORT}`);
});