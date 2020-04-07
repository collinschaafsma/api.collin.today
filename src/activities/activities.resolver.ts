import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewActivityInput } from './dto/new-activity.input';
import { ActivitiesArgs } from './dto/activities.args';
import { Activity } from './activity.entity';
import { ActivitiesService } from './activities.service';

@Resolver(of => Activity)
export class ActivitiesResolver {
  constructor(private readonly activitiesService: ActivitiesService) {}

  @Query(returns => Activity)
  async activity(@Args('id') id: string): Promise<Activity> {
    const activity = await this.activitiesService.findOneById(id);
    if (!activity) {
      throw new NotFoundException(id);
    }
    return activity;
  }

  @Query(returns => [Activity])
  activities(@Args() activitiesArgs: ActivitiesArgs): Promise<Activity[]> {
    return this.activitiesService.findAll(activitiesArgs);
  }

  @Mutation(returns => Activity)
  async addActivity(
    @Args('newActivityData') newActivityData: NewActivityInput,
  ): Promise<Activity> {
    const activity = await this.activitiesService.create(newActivityData);
    return activity;
  }

  @Mutation(returns => Boolean)
  async removeActivity(@Args('id') id: string) {
    return this.activitiesService.remove(id);
  }
}