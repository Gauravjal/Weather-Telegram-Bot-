import * as mongoose from 'mongoose';
export declare const SubscriberModel: mongoose.Model<{
    chatId?: number;
    username?: string;
    blocked?: boolean;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    chatId?: number;
    username?: string;
    blocked?: boolean;
}> & {
    chatId?: number;
    username?: string;
    blocked?: boolean;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    chatId?: number;
    username?: string;
    blocked?: boolean;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    chatId?: number;
    username?: string;
    blocked?: boolean;
}>> & mongoose.FlatRecord<{
    chatId?: number;
    username?: string;
    blocked?: boolean;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
