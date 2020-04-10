import { ArgsType, Field, Int } from '@nestjs/graphql';
import { Min, Max, IsInt, IsNotEmpty } from 'class-validator';

/* eslint-disable @typescript-eslint/no-inferrable-types */

@ArgsType()
export class ActivitiesArgs {
  @Field(/* istanbul ignore next */ (_type) => Int)
  @Min(1)
  @Max(50)
  @IsInt()
  @IsNotEmpty()
  limit: number = 25;
}