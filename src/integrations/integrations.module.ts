import { Module } from '@nestjs/common';
import { IntegrationsResolver } from './integrations.resolver';
import { IntegrationsService } from './integrations.service';
import { Integration } from './integration.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationsController } from './integrations.controller';

@Module({
  providers: [IntegrationsService, IntegrationsResolver],
  imports: [TypeOrmModule.forFeature([Integration])],
  controllers: [IntegrationsController],
})
export class IntegrationsModule {}
