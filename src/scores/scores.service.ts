import { Injectable } from '@nestjs/common';
import { OuraScore } from './oura-score.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ScoresService {
  constructor(
    @InjectRepository(OuraScore)
    private ouraScoresRepository: Repository<OuraScore>,
  ){}

  async findAll(page = 1, limit = 30) {
    return await this.ouraScoresRepository.find({
      take: limit,
      skip: limit * (page - 1),
      order: {
        publishAt: "DESC"
      }
    });
  }
}
