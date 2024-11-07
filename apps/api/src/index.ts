import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import productRouter from './routes/product.route';
import clerkWebhookHandler from './routes/clerkWebhookHandler';
import cors from 'cors';

dotenv.config();

const app: Express = express();
const port = 4000;

app.use('/api/webhooks', clerkWebhookHandler);

app.use(cors())
app.use(bodyParser.json());

app.use('/product', productRouter);
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