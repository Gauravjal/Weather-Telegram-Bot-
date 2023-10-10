import { Injectable, Logger,NotFoundException,Delete } from '@nestjs/common';
import axios from 'axios';
import * as mongoose from 'mongoose'; //
import {SubscriberModel} from '../subscriber.model'
import {Api_KeysModel} from '../api_keys.model'
const TelegramBot = require('node-telegram-bot-api');

mongoose.connect('mongodb+srv://gauravjalkote012:LgI8nq1IbH7HRLZ2@stackoverflow.ubg2kjm.mongodb.net/', {
}); // Connect to your MongoDB instance

const subscriberSchema = new mongoose.Schema({
  chatId: Number,
});

// const SubscriberModel = mongoose.model('Subscriber', subscriberSchema); 
@Injectable()
export class TelegramService {
  private logger = new Logger(TelegramService.name);
  private bot: any;
  private subscribers: Set<number> = new Set(); // Set to store chatIds of subscribers

  constructor() {
   this.initialize(); 
  }


  private async initialize() {
    try {
      const api_keys = await Api_KeysModel.find().exec();
      this.bot = new TelegramBot(api_keys[0].TELEGRAM_TOKEN, { polling: true });
      this.bot.on('message', this.handleMessages.bind(this));

      setInterval(() => {
        this.sendDailyWeatherUpdates();
      }, 24 * 60 * 60 * 1000); // Every 24 hours

      const subscribers = await SubscriberModel.find().exec();
      subscribers.forEach(subscriber => {
        this.subscribers.add(subscriber.chatId);
      });
    } catch (err) {
      console.error(`Error initializing: ${err.message}`);
    }
  }


  async handleMessages(msg: any): Promise<void> {
    const chatId = msg.chat.id;
    const message = msg.text;
    const username = msg.from.username;
    const subscriber = await SubscriberModel.findOne({ chatId }).exec();
    if(!subscriber && !message?.startsWith('/subscribe')){
      this.bot.sendMessage(chatId, 'You are not subscribed .Please type command: /subscribe');
    }
    else if(subscriber && subscriber.blocked){
      this.bot.sendMessage(chatId, 'You have been blocked by the admin');
    }
    else if (message?.startsWith('/weather')) {
      const city = message.split(' ')[1];
      if (city) {
        try {
          const weatherData = await this.getWeatherData(city);
          this.bot.sendMessage(chatId, weatherData);
        } catch (error) {
          this.logger.error(`Error fetching weather data: ${error.message}`);
          this.bot.sendMessage(chatId, 'Error fetching weather data. Please try again later.');
        }
      } else {
        this.bot.sendMessage(chatId, 'Please provide a city name for weather information.');
      }
    } else if (message?.startsWith('/subscribe')) {
      this.subscribers.add(chatId);
      this.bot.sendMessage(chatId, 'You are now subscribed to daily weather updates.');

      // Save subscriber to MongoDB
      const newSubscriber = new SubscriberModel({ chatId:chatId,username:username,blocked:false });
      newSubscriber.save();
    } else if (message?.startsWith('/unsubscribe')) {
      this.subscribers.delete(chatId);
      this.bot.sendMessage(chatId, 'You have unsubscribed from daily weather updates.');
      const subscriber = await SubscriberModel.findOneAndDelete({ chatId }).exec();
      if (!subscriber) {
        throw new NotFoundException(`Subscriber with chatId ${chatId} not found.`);
      }
    } else {
      const serverTime = new Date();
      const ISTOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
      const kolkataTime = new Date(serverTime.getTime() + ISTOffset);

      const serverHour = kolkataTime.getUTCHours(); // Get Kolkata's local hour
      const serverMinute = kolkataTime.getUTCMinutes(); // Get Kolkata's local minute

      this.bot.sendMessage(chatId, `To see the weather details type command : /weather city-name`);
    }
  }

  async sendDailyWeatherUpdates(): Promise<void> {
    const cities = ['pune', 'latur', 'delhi']; // List of cities to send weather updates for

    const serverTime = new Date();
    const ISTOffset = 5.5 * 60 * 60 * 1000; // 5.5 hours in milliseconds
    const kolkataTime = new Date(serverTime.getTime() + ISTOffset);

    const serverHour = kolkataTime.getUTCHours(); // Get Kolkata's local hour
    const serverMinute = kolkataTime.getUTCMinutes(); // Get Kolkata's local minute

    // if (serverHour === 14 && serverMinute === 53) {


        try {
          const weatherData = await this.getWeatherData('pune');
          for (const subscriber of this.subscribers) {
            this.bot.sendMessage(subscriber, `Daily Weather Update for pune: ${weatherData}`);
          }
        } catch (error) {
          this.logger.error(`Error sending daily weather update for pune: ${error.message}`);
        }
      
    // }
  }

  async getWeatherData(city: string): Promise<string> {
    // Same as your existing getWeatherData method
    const api_keys = await Api_KeysModel.find().exec();
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${api_keys[0].OPEN_WEATHERMAP_API_KEY}`;

    try {
      const response = await axios.get(apiUrl);
      const temperature = response.data.main.temp;
      const weatherDescription = response.data.weather[0].description;
      return `Weather in ${city}: ${weatherDescription}, Temperature: ${temperature}°C`;
    } catch (error) {
      throw new Error('Failed to fetch weather data.');
    }
  }
}
