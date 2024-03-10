import { Router } from "express";
import emailController from "../../controller/email/index.js";

const EmailRoutes = Router();
EmailRoutes.post("/email", emailController.sendEmail);

export default EmailRoutes;
