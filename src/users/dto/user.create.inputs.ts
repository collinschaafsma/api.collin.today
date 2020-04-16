import { Field, InputType } from '@nestjs/graphql';
import {  
  IsString,
  IsNotEmpty,
  IsEmail
} from 'class-validator';

@InputType()
export class UserCreateInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  public firstName!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  public lastName!: string;

  @Field()
  @IsNotEmpty()
  @IsEmail()
  public email!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  public password!: string;

}