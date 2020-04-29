import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  IsUUID,
  IsNotEmpty,
  IsDateString,
  IsNumber,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
} from 'typeorm';
import { UUID } from '../types/global';

@ObjectType()
@Entity({ name: 'ouraScores' })
export class OuraScore {
  @PrimaryGeneratedColumn('uuid')
  @Field(/* istanbul ignore next */ (_type) => ID)  
  @IsUUID()
  public id!: UUID;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsNumber()
  public readiness!: number;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsNumber()
  public hrvBalance!: number;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsNumber()
  public previousNight!: number;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsNumber()
  public recoveryIndex!: number;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsNumber()
  public restingHr!: number;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsNumber()
  public sleepBalance!: number;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsNumber()
  public temperature!: number;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsNumber()
  public sleep!: number;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsNumber()
  public deepSleep!: number;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsNumber()
  public sleepDisturbances!: number;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsNumber()
  public sleepEfficiency!: number;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsNumber()
  public sleepLatency!: number;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsNumber()
  public sleepRem!: number;

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