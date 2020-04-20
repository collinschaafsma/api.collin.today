import { NotFoundException, UseGuards } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { CurrentUser } from '../decorators/current.user';
import { UserCreateInput } from './dto/user.create.inputs';

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-inferrable-types */

@Resolver(of => User)
export class UserResolver {
  constructor(private readonly usersService: UsersService) {}

  @Query(returns => User)
  @UseGuards(GqlAuthGuard)
  me(@CurrentUser() user: User) {
    return this.usersService.findOneById(user.id);
  }

  @Mutation(returns => User)
  async createUser(@Args('userCreateInput') userCreateInput: UserCreateInput): Promise<User> {
    return await this.usersService.create(userCreateInput);
  }

}