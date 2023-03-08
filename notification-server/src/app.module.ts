import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PubsubModule } from './modules/pubsub/pubsub.module';
import { PushNotificationModule } from './modules/push-notification/push-notification.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SharedModule,
    PubsubModule,
    PushNotificationModule,
    
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
