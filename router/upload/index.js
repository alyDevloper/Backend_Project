import { Router } from "express";
import multer from "multer";
import ImageController from "../../controller/upload/index.js";
import AuthMiddleware from "../../middleware/authmiddleware.js";

const ImageRoutes = Router();

const upload = multer();

ImageRoutes.post(
  "/userImage",
  AuthMiddleware,
  upload.single("photo"),
  ImageController.uploadImage
);

export default ImageRoutes;
