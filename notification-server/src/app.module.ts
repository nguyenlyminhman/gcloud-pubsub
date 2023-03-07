import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PubsubModule } from './modules/pubsub/pubsub.module';
import { PushNotificationModule } from './modules/push-notification/push-notification.module';

@Module({
  imports: [PubsubModule, PushNotificationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
