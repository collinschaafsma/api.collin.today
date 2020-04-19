import { Resolver, Args, Mutation, Query } from '@nestjs/graphql';
import { IntegrationsService } from './integrations.service';
import { IntegrationCreateInput } from './dto/integration.create.inputs';
import { Integration } from './integration.entity';
import { UseGuards, NotFoundException } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/gql-auth.guard';
import { IntegrationUpdateInput } from './dto/integration.update.inputs';
import { CurrentUser } from '../decorators/current.user';
import { User } from '../users/user.entity';

@Resolver('Integrations')
export class IntegrationsResolver {
  constructor(private readonly integrationsService: IntegrationsService) {}

  @Mutation(returns => Integration)
  @UseGuards(GqlAuthGuard)
  async createIntegration(
      @Args('integrationCreateInput') integrationCreateInput: IntegrationCreateInput,
      @CurrentUser() user: User
    ): Promise<Integration> {
    return await this.integrationsService.create(integrationCreateInput, user);
  }

  @Mutation(returns => Integration)
  @UseGuards(GqlAuthGuard)
  async updateIntegration(
    @Args('id') id: string,
    @Args('integrationUpdateInput') integrationUpdateInput: IntegrationUpdateInput
  ): Promise<Integration> {
    return await this.integrationsService.update(id, integrationUpdateInput);
  }  

  @Mutation(returns => Boolean)
  @UseGuards(GqlAuthGuard)
  async deleteIntegration(@Args('id') id: string) {
    return this.integrationsService.delete(id);
  }

  @Query(returns => Integration)
  async integrationByKey(@Args('key') key: string): Promise<Integration> {
    const activity = await this.integrationsService.findOneByKey(key);
    if (!activity) {
      throw new NotFoundException(key);
    }
    return activity;
  }
}
