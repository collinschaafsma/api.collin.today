import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Activity {
  @Field(type => ID)
  id: string;

  @Field()
  title: string;
}