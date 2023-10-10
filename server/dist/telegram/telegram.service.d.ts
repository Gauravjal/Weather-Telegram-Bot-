export declare class TelegramService {
    private logger;
    private bot;
    private subscribers;
    constructor();
    private initialize;
    handleMessages(msg: any): Promise<void>;
    sendDailyWeatherUpdates(): Promise<void>;
    getWeatherData(city: string): Promise<string>;
}
