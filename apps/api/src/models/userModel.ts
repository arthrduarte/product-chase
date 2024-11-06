import mongoose, { Schema, Document } from "mongoose";

interface IUser extends Document {
    clerk_id: string,
    email: string,
    first_name: string,
    last_name: string,
}

const UserSchema: Schema = new Schema({
    clerk_id:{
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    first_name: {
        type: String,
    },
    last_name: {
        type: String,
    }
});

export const User = mongoose.model<IUser>('User', UserSchema);