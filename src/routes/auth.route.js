import { Router } from "express";
import AuthController from "../controllers/auth.controller.js";

const authRouter = Router();

const controller = new AuthController();

authRouter.post("/users/register", controller.register.bind(controller));

authRouter.post("/users/login", controller.login.bind(controller));

export default authRouter;
