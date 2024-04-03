import { Router } from "express";
import AuthController from "../../controller/auth/index.js";

const authRoutes = Router();

authRoutes.post("/login", AuthController.login);
authRoutes.post("/register", AuthController.register);

export default authRoutes;
