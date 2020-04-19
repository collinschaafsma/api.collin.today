import { Injectable, HttpService, Inject } from '@nestjs/common';
import { Integration } from './integration.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { IntegrationCreateInput } from './dto/integration.create.inputs';
import { User } from '../users/user.entity';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

@Injectable()
export class IntegrationsService {
  constructor(
    @InjectRepository(Integration)
    private integrationsRepository: Repository<Integration>,

    @Inject(HttpService)
    private readonly httpService: HttpService,
  ) {}

  async create(data: IntegrationCreateInput, user: User): Promise<Integration> {
    const integration = this.integrationsRepository.create(data);
    integration.userId = user.id;

    return await this.integrationsRepository.save(integration);
  }

  async update(id: string, data: IntegrationCreateInput): Promise<Integration> {
    const integrationToUpdate = await this.integrationsRepository.findOneOrFail(id);
    const integrationUpdated = Object.assign(integrationToUpdate, data);
    
    return await this.integrationsRepository.save(integrationUpdated);
  }

  async findOneByKey(key: string): Promise<Integration> {
    return await this.integrationsRepository.findOne({key});
  }

  async delete(id: string): Promise<DeleteResult> {
    return await this.integrationsRepository.delete(id);
  }

  //TODO: Move this into a que someday
  async stravaActivityFetch(stravaActivityId: string): Promise<boolean> {
    const accessToken = await this.accessTokenByIntegrationKey('strava');
    console.log(accessToken);
    console.log(stravaActivityId);
    return true;
  }

  private async accessTokenByIntegrationKey(key: string): Promise<string> {
    const integration = await this.findOneByKey(key);
    const now = new Date(Date.now());

    if(integration.accessTokenExpiresAt < now) {
      // The access token has expired

      



      return "needs update";
    }

    //The current access token is still valid
    return integration.accessToken;
  }
}
