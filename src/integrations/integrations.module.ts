import { Module } from '@nestjs/common';
import { IntegrationsResolver } from './integrations.resolver';
import { IntegrationsService } from './integrations.service';
import { Integration } from './integration.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [IntegrationsService, IntegrationsResolver],
  imports: [TypeOrmModule.forFeature([Integration])],
})
export class IntegrationsModule {}
