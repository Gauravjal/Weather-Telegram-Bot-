import { Controller, Get, Delete,Patch, Param, NotFoundException ,Body} from '@nestjs/common';
import {SubscriberModel} from '../subscriber.model'// Import your Mongoose model
import {Api_KeysModel} from '../api_keys.model'
@Controller('admin')
export class AdminController {
  constructor() {}

  @Get('subscribers')
  async getAllSubscribers(): Promise<any> {
    try {
      const subscribers = await SubscriberModel.find().exec();
      return { subscribers };
    } catch (error) {
      // Handle errors appropriately, e.g., log the error and return an error response
      console.error(`Error retrieving subscribers: ${error.message}`);
      throw new Error('Failed to retrieve subscribers.');
    }
  }

  @Get('api-keys')
  async getApiKeys(): Promise<any> {
    try {
      const api_keys = await Api_KeysModel.find().exec();
      return { api_keys };
    } catch (error) {
      // Handle errors appropriately, e.g., log the error and return an error response
      console.error(`Error retrieving api keys: ${error.message}`);
      throw new Error('Failed to retrieve api keys.');
    }
  }

  @Patch('subscribers/:chatId')
  async blockSubscriber(@Param('chatId') chatId: number): Promise<void> {
    try {
        let subscriber = await SubscriberModel.findOne({ chatId }).exec();

      if (!subscriber) {
        throw new NotFoundException(`Subscriber with chatId ${chatId} not found.`);
      }

      subscriber.blocked = !subscriber.blocked; // Toggle the blocked status
      const updatedSubscriber = await subscriber.save();
    } catch (error) {
      // Handle errors appropriately, e.g., log the error and return an error response
      console.error(`Error blocking/unblocking subscriber: ${error.message}`);
      throw new Error('Failed to block/unblock subscriber.');
    }
  }

  @Delete('subscribers/:chatId')
  async deleteSubscriber(@Param('chatId') chatId: number): Promise<void> {
    try {
      const subscriber = await SubscriberModel.findOneAndDelete({ chatId }).exec();
      if (!subscriber) {
        throw new NotFoundException(`Subscriber with chatId ${chatId} not found.`);
      }
    } catch (error) {
      // Handle errors appropriately, e.g., log the error and return an error response
      console.error(`Error deleting subscriber: ${error.message}`);
      throw new Error('Failed to delete subscriber.');
    }
  }


  @Patch('telegram-token')
async updateTelegramToken(@Body() body: { token: string }): Promise<void> {
  try {
    const { token } = body;
    let api_key = await Api_KeysModel.findOne().exec();
    if (!api_key) {
        // If API key not found, create a new one
        api_key = new Api_KeysModel();
    }

    api_key.TELEGRAM_TOKEN=token;
    api_key.save();
    // Update the Telegram token in your configuration or database
    // Optionally, you can validate the new token before updating
  } catch (error) {
    console.error(`Error updating Telegram token: ${error.message}`);
    throw new Error('Failed to update Telegram token.');
  }
}


@Patch('openweathermap-api-key')
async updateOpenWeatherMapApiKey(@Body() body: { apiKey: string }): Promise<void> {
  try {
    const { apiKey } = body;
    let api_key = await Api_KeysModel.findOne().exec();
    if (!api_key) {
        // If API key not found, create a new one
        api_key = new Api_KeysModel();
    }
    api_key.OPEN_WEATHERMAP_API_KEY=apiKey;
    api_key.save();
    // Update the OpenWeatherMap API key in your configuration or database
    // Optionally, you can validate the new API key before updating
  } catch (error) {
    console.error(`Error updating OpenWeatherMap API key: ${error.message}`);
    throw new Error('Failed to update OpenWeatherMap API key.');
  }
}




}
