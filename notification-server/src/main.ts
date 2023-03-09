import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions } from '@nestjs/microservices';
import { GCPubSubServer } from 'nestjs-google-pubsub-microservice';
import { AppModule } from './app.module';
import type { NestExpressApplication } from '@nestjs/platform-express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { join } from 'path';
import helmet from 'helmet';
import { SwaggerConfig } from './config/swagger';
import { SharedModule } from './shared/shared.module';
import { ServerConfigService } from './shared/server-config.service';

async function bootstrap(): Promise<NestExpressApplication> {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter(),
    { cors: true },
  );

  const serverConfig = app.select(SharedModule).get(ServerConfigService );
  const { port } = serverConfig.serverPort;
  const { topic, subscription, projectId} = serverConfig.pubSubServerConfig;

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.use(helmet());

  // Microservice with gCloud PubSub
  app.connectMicroservice<MicroserviceOptions>({
    strategy: new GCPubSubServer({
      topic: topic,
      subscription: subscription,
      client: {
        projectId: projectId,
      },
    }),
  });
  // Setup swagger
  if (serverConfig.swaggerEnabled) {
    SwaggerConfig(app);
  }
  // Set global prefix for endpoint
  app.setGlobalPrefix('/api');

  await app.listen(port);
  return app;
}
void bootstrap();
