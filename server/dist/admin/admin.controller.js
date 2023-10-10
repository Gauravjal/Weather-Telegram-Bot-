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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const subscriber_model_1 = require("../subscriber.model");
const api_keys_model_1 = require("../api_keys.model");
let AdminController = class AdminController {
    constructor() { }
    async getAllSubscribers() {
        try {
            const subscribers = await subscriber_model_1.SubscriberModel.find().exec();
            return { subscribers };
        }
        catch (error) {
            console.error(`Error retrieving subscribers: ${error.message}`);
            throw new Error('Failed to retrieve subscribers.');
        }
    }
    async getApiKeys() {
        try {
            const api_keys = await api_keys_model_1.Api_KeysModel.find().exec();
            return { api_keys };
        }
        catch (error) {
            console.error(`Error retrieving api keys: ${error.message}`);
            throw new Error('Failed to retrieve api keys.');
        }
    }
    async blockSubscriber(chatId) {
        try {
            let subscriber = await subscriber_model_1.SubscriberModel.findOne({ chatId }).exec();
            if (!subscriber) {
                throw new common_1.NotFoundException(`Subscriber with chatId ${chatId} not found.`);
            }
            subscriber.blocked = !subscriber.blocked;
            const updatedSubscriber = await subscriber.save();
        }
        catch (error) {
            console.error(`Error blocking/unblocking subscriber: ${error.message}`);
            throw new Error('Failed to block/unblock subscriber.');
        }
    }
    async deleteSubscriber(chatId) {
        try {
            const subscriber = await subscriber_model_1.SubscriberModel.findOneAndDelete({ chatId }).exec();
            if (!subscriber) {
                throw new common_1.NotFoundException(`Subscriber with chatId ${chatId} not found.`);
            }
        }
        catch (error) {
            console.error(`Error deleting subscriber: ${error.message}`);
            throw new Error('Failed to delete subscriber.');
        }
    }
    async updateTelegramToken(body) {
        try {
            const { token } = body;
            let api_key = await api_keys_model_1.Api_KeysModel.findOne().exec();
            if (!api_key) {
                api_key = new api_keys_model_1.Api_KeysModel();
            }
            api_key.TELEGRAM_TOKEN = token;
            api_key.save();
        }
        catch (error) {
            console.error(`Error updating Telegram token: ${error.message}`);
            throw new Error('Failed to update Telegram token.');
        }
    }
    async updateOpenWeatherMapApiKey(body) {
        try {
            const { apiKey } = body;
            let api_key = await api_keys_model_1.Api_KeysModel.findOne().exec();
            if (!api_key) {
                api_key = new api_keys_model_1.Api_KeysModel();
            }
            api_key.OPEN_WEATHERMAP_API_KEY = apiKey;
            api_key.save();
        }
        catch (error) {
            console.error(`Error updating OpenWeatherMap API key: ${error.message}`);
            throw new Error('Failed to update OpenWeatherMap API key.');
        }
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Get)('subscribers'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getAllSubscribers", null);
__decorate([
    (0, common_1.Get)('api-keys'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getApiKeys", null);
__decorate([
    (0, common_1.Patch)('subscribers/:chatId'),
    __param(0, (0, common_1.Param)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "blockSubscriber", null);
__decorate([
    (0, common_1.Delete)('subscribers/:chatId'),
    __param(0, (0, common_1.Param)('chatId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "deleteSubscriber", null);
__decorate([
    (0, common_1.Patch)('telegram-token'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateTelegramToken", null);
__decorate([
    (0, common_1.Patch)('openweathermap-api-key'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "updateOpenWeatherMapApiKey", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [])
], AdminController);
//# sourceMappingURL=admin.controller.js.map