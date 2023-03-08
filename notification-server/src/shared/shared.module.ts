import { Module } from '@nestjs/common';
import { ServerConfigService } from './server-config';

const providers = [
    ServerConfigService
]

@Module({
    imports: [],
    controllers: [],
    providers,
    exports: [...providers]
})
export class SharedModule {}
