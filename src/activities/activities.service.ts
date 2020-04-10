import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NewActivityInput } from './dto/new-activity.input';
import { ActivitiesArgs } from './dto/activities.args';
import { Activity } from './activity.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
  ) {}

  async create(data: NewActivityInput): Promise<Activity> {
    return {} as any;
  }

  async findOneById(id: string): Promise<Activity> {
    return await this.activitiesRepository.findOne(id);
  }

  async findAll(activitiesArgs: ActivitiesArgs): Promise<Activity[]> {
    return await this.activitiesRepository.find();
  }

  async remove(id: string): Promise<void> {
    await this.activitiesRepository.delete(id);
  }
}