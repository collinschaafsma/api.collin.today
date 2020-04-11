import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { NewActivityInput } from './dto/new-activity.input';
import { Activity } from './activity.entity';
import {paginate, Pagination, IPaginationOptions} from 'nestjs-typeorm-paginate';

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

  async findAll(options: IPaginationOptions): Promise<Pagination<Activity>> {
    const qb = this.activitiesRepository.createQueryBuilder('activity');
    qb.orderBy('activity.publishAt', 'DESC');

    return paginate<Activity>(qb, options);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.activitiesRepository.delete(id);
  }
}