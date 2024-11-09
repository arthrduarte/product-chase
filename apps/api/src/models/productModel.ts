import mongoose, { Schema, Document } from "mongoose";

interface IProduct extends Document {
    title: string;
    description: string;
    url: string;
    upvotes: number;
}

const ProductSchema: Schema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    upvotes: {
        type: Number,
        required: true,
        default: 0
    },
    tags: {
        type: [String],
        required: true
    }
})

export default mongoose.model<IProduct>('Product', ProductSchema);
