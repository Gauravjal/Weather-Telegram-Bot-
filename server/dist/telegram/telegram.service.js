"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var TelegramService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TelegramService = void 0;
const common_1 = require("@nestjs/common");
const axios_1 = require("axios");
const mongoose = require("mongoose");
const subscriber_model_1 = require("../subscriber.model");
const api_keys_model_1 = require("../api_keys.model");
const TelegramBot = require('node-telegram-bot-api');
mongoose.connect('mongodb+srv://gauravjalkote012:LgI8nq1IbH7HRLZ2@stackoverflow.ubg2kjm.mongodb.net/', {});
const subscriberSchema = new mongoose.Schema({
    chatId: Number,
});
let TelegramService = TelegramService_1 = class TelegramService {
    constructor() {
        this.logger = new common_1.Logger(TelegramService_1.name);
        this.subscribers = new Set();
        this.initialize();
    }
    async initialize() {
        try {
            const api_keys = await api_keys_model_1.Api_KeysModel.find().exec();
            this.bot = new TelegramBot(api_keys[0].TELEGRAM_TOKEN, { polling: true });
            this.bot.on('message', this.handleMessages.bind(this));
            setInterval(() => {
                this.sendDailyWeatherUpdates();
            }, 24 * 60 * 60 * 1000);
            const subscribers = await subscriber_model_1.SubscriberModel.find().exec();
            subscribers.forEach(subscriber => {
                this.subscribers.add(subscriber.chatId);
            });
        }
        catch (err) {
            console.error(`Error initializing: ${err.message}`);
        }
    }
    async handleMessages(msg) {
        const chatId = msg.chat.id;
        const message = msg.text;
        const username = msg.from.username;
        const subscriber = await subscriber_model_1.SubscriberModel.findOne({ chatId }).exec();
        if (!subscriber && !message?.startsWith('/subscribe')) {
            this.bot.sendMessage(chatId, 'You are not subscribed .Please type command: /subscribe');
        }
        else if (subscriber && subscriber.blocked) {
            this.bot.sendMessage(chatId, 'You have been blocked by the admin');
        }
        else if (message?.startsWith('/weather')) {
            const city = message.split(' ')[1];
            if (city) {
                try {
                    const weatherData = await this.getWeatherData(city);
                    this.bot.sendMessage(chatId, weatherData);
                }
                catch (error) {
                    this.logger.error(`Error fetching weather data: ${error.message}`);
                    this.bot.sendMessage(chatId, 'Error fetching weather data. Please try again later.');
                }
            }
            else {
                this.bot.sendMessage(chatId, 'Please provide a city name for weather information.');
            }
        }
        else if (message?.startsWith('/subscribe')) {
            this.subscribers.add(chatId);
            this.bot.sendMessage(chatId, 'You are now subscribed to daily weather updates.');
            const newSubscriber = new subscriber_model_1.SubscriberModel({ chatId: chatId, username: username, blocked: false });
            newSubscriber.save();
        }
        else if (message?.startsWith('/unsubscribe')) {
            this.subscribers.delete(chatId);
            this.bot.sendMessage(chatId, 'You have unsubscribed from daily weather updates.');
            const subscriber = await subscriber_model_1.SubscriberModel.findOneAndDelete({ chatId }).exec();
            if (!subscriber) {
                throw new common_1.NotFoundException(`Subscriber with chatId ${chatId} not found.`);
            }
        }
        else {
            const serverTime = new Date();
            const ISTOffset = 5.5 * 60 * 60 * 1000;
            const kolkataTime = new Date(serverTime.getTime() + ISTOffset);
            const serverHour = kolkataTime.getUTCHours();
            const serverMinute = kolkataTime.getUTCMinutes();
            this.bot.sendMessage(chatId, `To see the weather details type command : /weather city-name`);
        }
    }
    async sendDailyWeatherUpdates() {
        const cities = ['pune', 'latur', 'delhi'];
        const serverTime = new Date();
        const ISTOffset = 5.5 * 60 * 60 * 1000;
        const kolkataTime = new Date(serverTime.getTime() + ISTOffset);
        const serverHour = kolkataTime.getUTCHours();
        const serverMinute = kolkataTime.getUTCMinutes();
        try {
            const weatherData = await this.getWeatherData('pune');
            for (const subscriber of this.subscribers) {
                this.bot.sendMessage(subscriber, `Daily Weather Update for pune: ${weatherData}`);
            }
        }
        catch (error) {
            this.logger.error(`Error sending daily weather update for pune: ${error.message}`);
        }
    }
    async getWeatherData(city) {
        const api_keys = await api_keys_model_1.Api_KeysModel.find().exec();
        const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_keys[0].OPEN_WEATHERMAP_API_KEY}`;
        try {
            const response = await axios_1.default.get(apiUrl);
            const temperature = response.data.main.temp;
            const weatherDescription = response.data.weather[0].description;
            return `Weather in ${city}: ${weatherDescription}, Temperature: ${temperature}°C`;
        }
        catch (error) {
            throw new Error('Failed to fetch weather data.');
        }
    }
};
exports.TelegramService = TelegramService;
exports.TelegramService = TelegramService = TelegramService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TelegramService);
//# sourceMappingURL=telegram.service.js.map