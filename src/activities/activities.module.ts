import { Module } from '@nestjs/common';
import { ActivitiesResolver } from './activities.resolver';
import { ActivitiesService } from './activities.service';

@Module({
  providers: [ActivitiesResolver, ActivitiesService],
})
export class ActivitiesModule {}