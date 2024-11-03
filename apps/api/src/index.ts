import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import signupRouter from './routes/signup.route';

dotenv.config();

const app: Express = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/auth/signup', signupRouter);
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server'); 
});

mongoose
    .connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@product-chase.ihtax.mongodb.net/product-chase`)
    .then(() => {
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });