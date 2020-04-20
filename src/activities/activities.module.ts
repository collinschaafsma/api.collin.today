import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ActivitiesResolver } from './activities.resolver';
import { ActivitiesService } from './activities.service';
import { Activity } from './activity.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Activity])],
  providers: [ActivitiesResolver, ActivitiesService],
})
export class ActivitiesModule {}