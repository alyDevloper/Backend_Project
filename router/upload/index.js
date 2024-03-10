import { Router } from "express";
import multer from "multer";
import ImageController from "../../controller/upload/index.js";

const ImageRoutes = Router();

const upload = multer();

ImageRoutes.post(
  "/userImage",
  upload.single("photo"),
  ImageController.uploadImage
);

export default ImageRoutes;
