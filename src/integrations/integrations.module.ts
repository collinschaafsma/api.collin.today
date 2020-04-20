import { Module, HttpModule } from '@nestjs/common';
import { IntegrationsResolver } from './integrations.resolver';
import { IntegrationsService } from './integrations.service';
import { Integration } from './integration.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { IntegrationsController } from './integrations.controller';
import { Activity } from '../activities/activity.entity';
import { StravaActivity } from '../activities/strava-activity.entity';

@Module({
  providers: [IntegrationsService, IntegrationsResolver],
  imports: [TypeOrmModule.forFeature([Integration, Activity, StravaActivity]), HttpModule],
  controllers: [IntegrationsController],
})
export class IntegrationsModule {}
