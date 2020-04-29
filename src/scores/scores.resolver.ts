import { Args, Query, Resolver } from '@nestjs/graphql';
import { OuraScore } from './oura-score.entity';
import { ScoresService } from './scores.service';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */


@Resolver('Scores')
export class ScoresResolver {
  constructor(private readonly scoresService: ScoresService) {}

  @Query(returns => [OuraScore])
  async ouraScores(
    @Args('page', { nullable: true, defaultValue: 1 }) page?: number,
    @Args('limit', { nullable: true, defaultValue: 30}) limit?: number
  ): Promise<OuraScore[]> {
    return await this.scoresService.findAll(page, limit);
  }
}
