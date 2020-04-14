import { Field, ID, ObjectType } from '@nestjs/graphql';
import {
  IsUUID,
  IsNotEmpty,
  IsString,
  IsDateString,
  IsEmail,
} from 'class-validator';
import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
  Entity,
  BeforeInsert
} from 'typeorm';
import { UUID } from '../types/global';
import * as argon2 from 'argon2';

@ObjectType()
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(/* istanbul ignore next */ (_type) => ID)  
  @IsUUID()
  public id!: UUID;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsString()
  public firstName!: string;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsString()
  public lastName!: string;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @Column()
  @Field()
  @IsNotEmpty()
  @IsString()
  public password!: string;

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

  @BeforeInsert()
  async hashPassword() {
    this.password = await argon2.hash(this.password);
  }
}
