import { Request, Response, NextFunction } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

export interface CustomRequest extends Request {
    token: string | JwtPayload;
}

const isAuthenticated = (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];

        if (!token) throw new Error('No token provided');

        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);
        (req as CustomRequest).token = decoded;

        next();
    } catch (err) {
        res.status(401).json({ message: (err as Error).message });
    }
}

export default isAuthenticated