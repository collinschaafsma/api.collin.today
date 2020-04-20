import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { ActivityCreateInput } from './dto/activity.create.input';
import { Activity } from './activity.entity';
import { ActivityUpdateInput } from './dto/activity.update.input';

@Injectable()
export class ActivitiesService {
  constructor(
    @InjectRepository(Activity)
    private activitiesRepository: Repository<Activity>,
  ) {}

  async create(data: ActivityCreateInput): Promise<Activity> {
    return await this.activitiesRepository.save(
      this.activitiesRepository.create(data)
    );
  }

  async update(id: string, data: ActivityUpdateInput): Promise<Activity> {
    const activityToUpdate = await this.activitiesRepository.findOneOrFail(id);
    const activityUpdated = Object.assign(activityToUpdate, data);
    
    return await this.activitiesRepository.save(activityUpdated);
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