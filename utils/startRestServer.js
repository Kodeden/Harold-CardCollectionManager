import express from "express";
import bodyParser from "body-parser";
import imagesRouter from "../routes/images.router.js";

function createServer() {
  const app = express();
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use(express.static("client"));
  app.use(express.static("images"));
  
  app.use(imagesRouter);

  return app;
}

export default createServer;
