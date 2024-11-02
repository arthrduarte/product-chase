import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type VoteDocument = HydratedDocument<Vote>;

@Schema()
export class Vote {
    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop()
    url: string;

    @Prop()
    upvotes: number;
}

export const VoteSchema = SchemaFactory.createForClass(Vote);