import express, { Request, Response } from 'express';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());

// Example Route
app.get('/api/example', (req: Request, res: Response) => {
    res.json({ message: 'Hello, Express with TypeScript!' });
});

// Start the Server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
