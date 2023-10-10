import * as mongoose from 'mongoose';
export declare const Api_KeysModel: mongoose.Model<{
    TELEGRAM_TOKEN?: string;
    OPEN_WEATHERMAP_API_KEY?: string;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    TELEGRAM_TOKEN?: string;
    OPEN_WEATHERMAP_API_KEY?: string;
}> & {
    TELEGRAM_TOKEN?: string;
    OPEN_WEATHERMAP_API_KEY?: string;
} & {
    _id: mongoose.Types.ObjectId;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, {
    TELEGRAM_TOKEN?: string;
    OPEN_WEATHERMAP_API_KEY?: string;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    TELEGRAM_TOKEN?: string;
    OPEN_WEATHERMAP_API_KEY?: string;
}>> & mongoose.FlatRecord<{
    TELEGRAM_TOKEN?: string;
    OPEN_WEATHERMAP_API_KEY?: string;
}> & {
    _id: mongoose.Types.ObjectId;
}>>;
