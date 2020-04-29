import { Module } from '@nestjs/common';
import { ScoresService } from './scores.service';
import { ScoresResolver } from './scores.resolver';
import { OuraScore } from './oura-score.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [ScoresService, ScoresResolver],
  imports: [TypeOrmModule.forFeature([OuraScore])],
})
export class ScoresModule {}
