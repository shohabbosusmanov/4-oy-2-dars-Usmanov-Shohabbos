import { Router } from "express";
import BookController from "../controllers/book.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const bookRouter = Router();

const controller = new BookController();

bookRouter.get("/books", authMiddleware, controller.getAll.bind(controller));

bookRouter.get(
    "/books/:id",
    authMiddleware,
    controller.getOne.bind(controller)
);

bookRouter.post("/books", authMiddleware, controller.create.bind(controller));

bookRouter.put(
    "/books/:id",
    authMiddleware,
    controller.update.bind(controller)
);

bookRouter.delete(
    "/books/:id",
    authMiddleware,
    controller.delete.bind(controller)
);

export default bookRouter;
