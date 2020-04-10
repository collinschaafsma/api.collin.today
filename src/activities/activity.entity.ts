import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  IsUUID,
  IsOptional,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDateString,
  MinLength,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Index,
} from 'typeorm';
import { CrudValidationGroups } from '@nestjsx/crud';
import { UUID } from '../types/global';
import { ActivityType } from './dto/activities.types';

const { UPDATE } = CrudValidationGroups;

@ObjectType()
export class Activity {
  @IsUUID()
  @Field(/* istanbul ignore next */ (_type) => ID)
  @PrimaryGeneratedColumn('uuid')
  @IsNotEmpty()
  public id!: UUID;

  @IsOptional({ groups: [UPDATE] })
  @MinLength(1, { groups: [UPDATE] })
  @Index()
  @Column('varchar')
  @Field()
  @IsNotEmpty()
  @IsString()
  public title!: string;

  @IsOptional({ groups: [UPDATE] })
  @MinLength(1, { groups: [UPDATE] })
  @Index()
  @Column('varchar')
  @Field({ nullable: true })
  @IsString()
  public description?: string;

  @IsOptional({ groups: [UPDATE] })
  @Column({
    type: 'enum',
    enum: ActivityType,
    default: ActivityType.OTHER,
  })
  @Field()
  @IsEnum(ActivityType)
  public type!: ActivityType;

  @Field()
  @IsNotEmpty()
  @IsDateString()
  public publishAt!: Date;

  @Field()
  @CreateDateColumn()
  @IsNotEmpty()
  @IsDateString()
  public createdAt!: Date;

  @Field()
  @UpdateDateColumn()
  @IsNotEmpty()
  @IsDateString()
  public updatedAt!: Date;
}