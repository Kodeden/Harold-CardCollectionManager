import express from "express";
import fileUpload from "express-fileupload";
import ImagesController from "../controllers/images.controller.js";

const imagesRouter = express.Router();
const imagesController = new ImagesController();

imagesRouter.post(
  "/images",
  fileUpload({ createParentPath: true }),
  (req, res) => imagesController.createImage(req, res)
);

export default imagesRouter;
