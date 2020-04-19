import { Field, InputType } from '@nestjs/graphql';
import {  
  IsString,
  IsNotEmpty,
} from 'class-validator';

@InputType()
export class IntegrationCreateInput {
  @Field()
  @IsNotEmpty()
  @IsString()
  public key!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  public accessToken!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  public refreshToken!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  public authorizeUrl!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  public accessTokenUrl!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  public clientId!: string;

  @Field()
  @IsNotEmpty()
  @IsString()
  public secret!: string;

  @Field()
  @IsNotEmpty()
  public accessTokenExpiresAt!: Date;

}