import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();


const app: Express = express();
const port = 3000;

app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:3000`);
});
