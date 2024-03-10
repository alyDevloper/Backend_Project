import { Router } from "express";
import AuthController from "../../controller/auth/index.js";
import AuthMiddleware from "../../middleware/authmiddleware.js";

const authRoutes = Router();

authRoutes.post("/login", AuthMiddleware, AuthController.login);
authRoutes.post("/register", AuthMiddleware, AuthController.register);

export default authRoutes;
