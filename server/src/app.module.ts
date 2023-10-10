import { Module } from '@nestjs/common';
import { TelegramService } from './telegram/telegram.service';
import { AdminController } from './admin/admin.controller';
@Module({
  imports: [],
  controllers: [AdminController],
  providers: [TelegramService],
})
export class AppModule {
  constructor() {
    console.log('AppModule');
  }
}
