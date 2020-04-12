import { Field, InputType } from '@nestjs/graphql';
import { 
  IsOptional,
  MaxLength, 
  IsString,
  IsNotEmpty,
  IsEnum
} from 'class-validator';

import { ActivityType } from './activities.types';

@InputType()
export class ActivityUpdateInput {
  @Field({ nullable: true })
  @IsOptional()
  @MaxLength(30)
  public title?: string;

  @Field({ nullable: true })
  @IsString()
  @IsOptional()
  public description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsEnum(ActivityType)
  public type?: ActivityType;

  @Field({ nullable: true })
  @IsOptional()
  public publishAt?: Date;
}