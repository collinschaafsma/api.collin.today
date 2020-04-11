import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { NewActivityInput } from './dto/new-activity.input';
import { Activity } from './activity.entity';
import { ActivitiesService } from './activities.service';
import { Pagination } from 'nestjs-typeorm-paginate';

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
    @Args('page') page: number = 1, 
    @Args('limit') limit: number = 10,
  ): Promise<Pagination<Activity>> {
    return await this.activitiesService.findAll({
      page,
      limit
    });
  }

  @Mutation(returns => Activity)
  async createActivity(@Args('newActivityData') newActivityData: NewActivityInput): Promise<Activity> {
    return await this.activitiesService.create(newActivityData);
  }

  @Mutation(returns => Boolean)
  async deleteActivity(@Args('id') id: string) {
    return this.activitiesService.delete(id);
  }
}