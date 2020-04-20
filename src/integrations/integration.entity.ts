import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsDateString,
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
@Entity({ name: 'integrations' })
export class Integration {
  @PrimaryGeneratedColumn('uuid')
  @Field(/* istanbul ignore next */ (_type) => ID)  
  @IsUUID()
  public id!: UUID;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsString()
  public key!: string;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsUUID()
  public userId!: UUID;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsString()
  public accessToken!: string;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsString()
  public refreshToken!: string;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsString()
  public authorizeUrl!: string;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsString()
  public accessTokenUrl!: string;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsString()
  public clientId!: string;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsString()
  public secret!: string;

  @Column('timestamp')
  @Field()
  @IsNotEmpty()
  @IsDateString()
  public accessTokenExpiresAt!: Date;

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
