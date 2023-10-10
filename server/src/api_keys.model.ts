import * as mongoose from 'mongoose';

const apiKeysSchema = new mongoose.Schema({
  TELEGRAM_TOKEN: String,
  OPEN_WEATHERMAP_API_KEY: String,
});

export const Api_KeysModel = mongoose.model('API_KEYS', apiKeysSchema);
