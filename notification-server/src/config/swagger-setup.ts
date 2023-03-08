import type { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const documentBuilder = new DocumentBuilder()
    .setTitle('API NOTIFICATION SERVER')
    .setDescription('The NOTIFICATION API for HRMS system')

  if (process.env.API_VERSION) {
    documentBuilder.setVersion(process.env.API_VERSION);
  }

  const document = SwaggerModule.createDocument(app, documentBuilder.build());
  SwaggerModule.setup('documentation', app, document, {
    swaggerOptions: {
      persistAuthorization: true,
    },
    customSiteTitle: 'API NOTIFICATION SERVER',
    customfavIcon: '../img/favicon.ico',
    customCssUrl: '../css/swagger.css',
  });

  console.info(
    `Documentation: http://localhost:${process.env.PORT}/documentation`,
  );
}
