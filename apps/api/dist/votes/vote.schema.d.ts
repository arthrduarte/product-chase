import { HydratedDocument } from 'mongoose';
export type VoteDocument = HydratedDocument<Vote>;
export declare class Vote {
    title: string;
    description: string;
    url: string;
    upvotes: number;
}
export declare const VoteSchema: import("mongoose").Schema<Vote, import("mongoose").Model<Vote, any, any, any, import("mongoose").Document<unknown, any, Vote> & Vote & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Vote, import("mongoose").Document<unknown, {}, import("mongoose").FlatRecord<Vote>> & import("mongoose").FlatRecord<Vote> & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}>;
