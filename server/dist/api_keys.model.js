"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Api_KeysModel = void 0;
const mongoose = require("mongoose");
const apiKeysSchema = new mongoose.Schema({
    TELEGRAM_TOKEN: String,
    OPEN_WEATHERMAP_API_KEY: String,
});
exports.Api_KeysModel = mongoose.model('API_KEYS', apiKeysSchema);
//# sourceMappingURL=api_keys.model.js.map