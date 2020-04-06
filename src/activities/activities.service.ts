import { Injectable } from '@nestjs/common';
import { NewActivityInput } from './dto/new-activity.input';
import { ActivitiesArgs } from './dto/activities.args';
import { Activity } from './activity.model';

@Injectable()
export class ActivitiesService {

  async create(data: NewActivityInput): Promise<Activity> {
    return {} as any;
  }

  async findOneById(id: string): Promise<Activity> {
    return {} as any;
  }

  async findAll(recipesArgs: ActivitiesArgs): Promise<Activity[]> {
    return [] as Activity[];
  }

  async remove(id: string): Promise<boolean> {
    return true;
  }
}