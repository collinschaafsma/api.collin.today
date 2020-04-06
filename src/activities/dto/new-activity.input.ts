import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, Length, MaxLength } from 'class-validator';

@InputType()
export class NewActivityInput {
  @Field()
  @MaxLength(30)
  title: string;
}