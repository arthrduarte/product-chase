import express, { Request, Response } from 'express';
import { User } from '../models/userModel';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.post('/', async (req: Request, res: Response): Promise<any> => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        console.log((user));
        if (!user) return res.status(400).json({ error: "Email not registered" });

        const match = await bcrypt.compare(password, user.password);
        if (!match) return res.status(400).json({ error: "Invalid password" });


        const accessToken = jwt.sign({ id: user._id }, process.env.ACCESS_TOKEN_SECRET as string);
        return res.json({ accessToken });
    } catch (err) {
        return res.status(500).json({ message: (err as Error).message });
    }
});

export default router;