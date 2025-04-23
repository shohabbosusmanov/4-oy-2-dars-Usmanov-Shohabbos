import "dotenv/config";
import express from "express";
import { PrismaClient } from "@prisma/client";
import { errorMiddleware } from "./middlewares/error.middleware.js";
import { Routes } from "./routes/routes.js";
import cookieParser from "cookie-parser";

export const prisma = new PrismaClient();

const PORT = process.env.PORT;

const app = express();

app.use(cookieParser());

app.use(express.json());

app.use("/api", Routes());

app.use(errorMiddleware);

const initApp = async () => {
    try {
        await prisma.$connect();
        console.log("database connected");
        app.listen(PORT, () => console.log("server is running port:", PORT));
    } catch (error) {
        console.error(error.message);
        process.exit(1);
    }
};

initApp();
