import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsDateString,
  IsNumber,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  OneToOne,
  JoinColumn
} from 'typeorm';
import { UUID } from '../types/global';
import { Activity } from './activity.entity';

@ObjectType()
@Entity({ name: 'stravaActivities' })
export class StravaActivity {
  @PrimaryGeneratedColumn('uuid')
  @Field(/* istanbul ignore next */ (_type) => ID)  
  @IsUUID()
  public id!: UUID;

  @Column()
  @Field()
  @IsUUID()
  @IsNotEmpty()
  public activityId!: UUID;

  @Column()
  @Field({ nullable: true })
  @IsNumber()
  public distance?: number;

  @Column()
  @Field({ nullable: true })
  @IsNumber()
  public movingTime?: number;

  @Column()
  @Field({ nullable: true })
  @IsNumber()
  public elapsedTime?: number;

  @Column()
  @Field({ nullable: true })
  @IsNumber()
  public totalElevationGain?: number;

  @Column()
  @Field()
  @IsString()
  @IsNotEmpty()
  public stravaType!: string;

  @Column()
  @Field()
  @IsString()
  @IsNotEmpty()
  public externalId!: string;

  @Column('timestamp')
  @Field()
  @IsNotEmpty()
  @IsDateString()
  public startDate!: Date;

  @Column()
  @Field({ nullable: true })
  @IsString()
  public mapSummaryPolyline?: string;

  @Column()
  @Field({ nullable: true })
  @IsString()
  public mapPolyline?: string;

  @Column()
  @Field({ nullable: true })
  @IsNumber()
  public averageSpeed?: number;

  @Column()
  @Field({ nullable: true })
  @IsNumber()
  public maxSpeed?: number;

  @Column()
  @Field({ nullable: true })
  @IsNumber()
  public averageCadence?: number;

  @Column()
  @Field({ nullable: true })
  @IsNumber()
  public averageWatts?: number;

  @Column()
  @Field({ nullable: true })
  @IsNumber()
  public weightedAverageWatts?: number;

  @Column()
  @Field({ nullable: true })
  @IsNumber()
  public maxWatts?: number;

  @Column()
  @Field({ nullable: true })
  @IsNumber()
  public kilojoules?: number;

  @Column()
  @Field({ nullable: true })
  @IsNumber()
  public averageHeartRate?: number;

  @Column()
  @Field({ nullable: true })
  @IsNumber()
  public maxHeartRate?: number;

  @Column()
  @Field({ nullable: true })
  @IsNumber()
  public sufferScore?: number;

  @Column()
  @Field({ nullable: true })
  @IsNumber()
  public calories?: number;

  @Column()
  @Field({ nullable: true })
  @IsString()
  public embedToken?: string;

  @Column()
  @Field({ nullable: true })
  @IsString()
  public deviceName?: string;

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

  @OneToOne(type => Activity, activity => activity.stravaActivity)
  @JoinColumn()
  activity: Activity;

}