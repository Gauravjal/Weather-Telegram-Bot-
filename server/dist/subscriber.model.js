"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriberModel = void 0;
const mongoose = require("mongoose");
const subscriberSchema = new mongoose.Schema({
    chatId: Number,
    username: String,
    blocked: Boolean,
});
exports.SubscriberModel = mongoose.model('Subscriber', subscriberSchema);
//# sourceMappingURL=subscriber.model.js.map