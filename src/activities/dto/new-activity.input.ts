import { Field, InputType } from '@nestjs/graphql';
import { 
  IsOptional,
  MaxLength, 
  IsString,
  IsNotEmpty,
  IsDateString,
  IsEnum
} from 'class-validator';

import { ActivityType } from './activities.types';

@InputType()
export class NewActivityInput {
  @Field()
  @MaxLength(30)
  public title!: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  public description?: string;

  @Field()
  @IsEnum(ActivityType)
  public type!: ActivityType;

  @Field()
  @IsNotEmpty()
  @IsDateString()
  public publishAt!: Date;
}