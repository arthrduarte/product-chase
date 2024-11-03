import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { User } from '../models/userModel';
import dotenv from 'dotenv';

dotenv.config();
const router = express.Router();

router.get('/', async (req: Request, res: Response): Promise<any> => {
    return res.status(200).json({ message: 'Signup route' });
})

router.post('/', async (req: Request, res: Response): Promise<any> => {
    const { email, username, password } = req.body;
    const hash = await bcrypt.hash(password, 10);

    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ message: 'Email is already in use' });

        const user = new User({ email, username, password: hash });
        await user.save();

        const accessToken = jwt.sign({ email, username }, process.env.ACCESS_TOKEN_SECRET as string);
        return res.status(201).json({ accessToken });
    } catch (error) {
        res.status(500).json({ message: (error as Error).message });
    }

})

export default router;