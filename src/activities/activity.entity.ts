import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  IsUUID,
  IsEnum,
  IsNotEmpty,
  IsString,
  IsDateString,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { UUID } from '../types/global';
import { ActivityType } from './dto/activities.types';

@ObjectType()
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  @Field(/* istanbul ignore next */ (_type) => ID)  
  @IsUUID()
  public id!: UUID;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsString()
  public title!: string;

  @Column()
  @Field({ nullable: true })
  @IsString()
  public description?: string;

  @Column({
    type: 'enum',
    enum: ActivityType,
    default: ActivityType.OTHER,
  })
  @Field()
  @IsEnum(ActivityType)
  public type!: ActivityType;

  @Column('timestamp')
  @Field()
  @IsNotEmpty()
  @IsDateString()
  public publishAt!: Date;

  @CreateDateColumn()
  @Field()
  @IsNotEmpty()
  @IsDateString()
  public createdAt!: Date;

  @UpdateDateColumn()
  @Field()
  @IsNotEmpty()
  @IsDateString()
  public updatedAt!: Date;
}