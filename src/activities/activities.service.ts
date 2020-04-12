import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult, UpdateResult } from 'typeorm';
import { NewActivityInput } from './dto/new-activity.input';
import { Activity } from './activity.entity';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
  ) {}

  async create(data: NewActivityInput): Promise<Activity> {
    return await this.activitiesRepository.save(
      this.activitiesRepository.create(data)
    );
  }

  async update(activity: Activity): Promise<UpdateResult> {
    return await this.activitiesRepository.update(activity.id, activity);
  }

  async findOneById(id: string): Promise<Activity> {
    return await this.activitiesRepository.findOne(id);
  }

  async findAll(page = 1, limit = 30) {
    return await this.activitiesRepository.find({
      take: limit,
      skip: limit * (page - 1),
      order: {
        publishAt: "DESC"
      }
    });
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.activitiesRepository.delete(id);
  }
}