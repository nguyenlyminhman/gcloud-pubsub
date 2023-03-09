import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PubsubModule } from './modules/pubsub/pubsub.module';
import { PushNotificationModule } from './modules/push-notification/push-notification.module';
import { ConfigModule } from '@nestjs/config';
import { SharedModule } from './shared/shared.module';
import { MessageModule } from './modules/message/message.module';
import { MongooseModule } from '@nestjs/mongoose';
import { MongooseTenantConfigService } from './shared/mongoose-tenant-config.service';
import { TenancyModule } from './modules/tenancy/tenancy.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      useClass:MongooseTenantConfigService
    }),
    SharedModule,
    PubsubModule,
    PushNotificationModule,
    MessageModule,
    TenancyModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
