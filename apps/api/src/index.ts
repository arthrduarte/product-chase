import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import mongoose from "mongoose";

dotenv.config();

const app: Express = express();
const port = 3000;


app.use(clerkMiddleware());

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});

app.get('/protected', (req, res) => {
    res.send('Express + TypeScript Server');
});

const start = async () => {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@product-chase.ihtax.mongodb.net/product-chase`)
        app.listen(port, () => {
            console.log(`Server is running at http://localhost:${port}`);
        });
    } catch (error) {
        console.log(error);
    }
}

start();