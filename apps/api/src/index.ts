import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import productRouter from './routes/product.route';
import clerkWebhookHandler from './routes/clerkWebhookHandler';
import cors from 'cors';
import AWS from 'aws-sdk'

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;

const s3 = new AWS.S3({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});

export { s3 };

app.use('/api/webhooks', clerkWebhookHandler);

app.use(cors({
    origin: [
        'https://product-chase.vercel.app',
        'http://localhost:3000'  // For local development
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

app.use(bodyParser.json());

app.use('/products', productRouter);
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