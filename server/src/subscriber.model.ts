import * as mongoose from 'mongoose';

const subscriberSchema = new mongoose.Schema({
  chatId: Number,
  username: String,
  blocked: Boolean,
});

export const SubscriberModel = mongoose.model('Subscriber', subscriberSchema);
