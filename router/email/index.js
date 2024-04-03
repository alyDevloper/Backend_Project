import { Router } from "express";
import emailController from "../../controller/email/index.js";
import AuthMiddleware from "../../middleware/authmiddleware.js";

const EmailRoutes = Router();
EmailRoutes.post("/email", AuthMiddleware, emailController.sendEmail);

export default EmailRoutes;
