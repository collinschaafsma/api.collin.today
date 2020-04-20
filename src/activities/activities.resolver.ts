import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { ActivityCreateInput } from './dto/activity.create.input';
import { ActivityUpdateInput } from './dto/activity.update.input';
import { Activity } from './activity.entity';
import { ActivitiesService } from './activities.service';
import { GqlAuthGuard } from '../auth/gql-auth.guard';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */

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
  async activities(
    @Args('page', { nullable: true, defaultValue: 1 }) page?: number,
    @Args('limit', { nullable: true, defaultValue: 30}) limit?: number
  ): Promise<Activity[]> {
    return await this.activitiesService.findAll(page, limit);
  }

  @Mutation(returns => Activity)
  @UseGuards(GqlAuthGuard)
  async createActivity(@Args('activityCreateInput') activityCreateInput: ActivityCreateInput): Promise<Activity> {
    return await this.activitiesService.create(activityCreateInput);
  }

  @Mutation(returns => Activity)
  @UseGuards(GqlAuthGuard)
  async updateActivity(
    @Args('id') id: string,
    @Args('activityUpdateInput') activityUpdateInput: ActivityUpdateInput
  ): Promise<Activity> {
    return await this.activitiesService.update(id, activityUpdateInput);
  }  

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteActivity(@Args('id') id: string) {
    return this.activitiesService.delete(id);
  }
}