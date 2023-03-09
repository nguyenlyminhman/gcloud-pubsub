import { Module } from '@nestjs/common';
import { MongooseTenantConfigService } from './mongoose-tenant-config.service';
import { ServerConfigService } from './server-config.service';

const providers = [
    ServerConfigService,
    MongooseTenantConfigService
]

@Module({
    imports: [],
    controllers: [],
    providers,
    exports: [...providers]
})
export class SharedModule {}
