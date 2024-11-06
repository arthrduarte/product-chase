import { Webhook } from 'svix';
import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { User } from '../models/userModel';

dotenv.config();
const app = express();

app.post(
    '/',
    bodyParser.raw({ type: 'application/json' }),
    async (req: Request, res: Response): Promise<void> => {
        const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET as string;
        if (!WEBHOOK_SECRET) {
            throw new Error('You need a WEBHOOK_SECRET in your .env');
        }

        // Get the headers and body
        const headers = req.headers;
        const payload = req.body;

        // Get the Svix headers for verification
        const svix_id = headers['svix-id'] as string;
        const svix_timestamp = headers['svix-timestamp'] as string;
        const svix_signature = headers['svix-signature'] as string;

        // If there are no Svix headers, error out
        if (!svix_id || !svix_timestamp || !svix_signature) {
            await res.status(400).json({
                success: false,
                message: 'Error occurred -- no Svix headers',
            });
            return
        }

        // Create a new Svix instance with your secret.
        const wh = new Webhook(WEBHOOK_SECRET);

        let evt: any;

        try {
            evt = wh.verify(payload, {
                'svix-id': svix_id,
                'svix-timestamp': svix_timestamp,
                'svix-signature': svix_signature,
            });
        } catch (err) {
            console.error('Error verifying webhook:', (err as Error).message);
            res.status(400).json({
                success: false,
                message: (err as Error).message,
            });
            return
        }

        const { id, first_name, last_name, email_addresses } = evt.data;
        const emailAddress = email_addresses[0]?.email_address;
        console.log('Webhook body:', evt.data)
        console.log(`User email: ${emailAddress} fname: ${first_name} lname: ${last_name} id: ${id}`)

        if (evt.type === 'user.created') {
            const user = new User({ clerk_id: id, email: emailAddress, first_name, last_name });
            await user.save();
        }
        if (evt.type === 'user.updated') {
            const user = await User.findOneAndUpdate({ clerk_id: id }, { email: emailAddress, first_name, last_name });
        }

        res.status(200).json({
            success: true,
            message: 'Webhook received',
        });
    }
);

export default app;
