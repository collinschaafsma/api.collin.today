import { Injectable } from '@nestjs/common';
import { Integration } from './integration.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, DeleteResult } from 'typeorm';
import { IntegrationCreateInput } from './dto/integration.create.inputs';
import { User } from '../users/user.entity';

@Injectable()
export class IntegrationsService {
  constructor(
    @InjectRepository(Integration)
    private integrationsRepository: Repository<Integration>,
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
}
