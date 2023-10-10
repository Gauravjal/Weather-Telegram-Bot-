export declare class AdminController {
    constructor();
    getAllSubscribers(): Promise<any>;
    getApiKeys(): Promise<any>;
    blockSubscriber(chatId: number): Promise<void>;
    deleteSubscriber(chatId: number): Promise<void>;
    updateTelegramToken(body: {
        token: string;
    }): Promise<void>;
    updateOpenWeatherMapApiKey(body: {
        apiKey: string;
    }): Promise<void>;
}
