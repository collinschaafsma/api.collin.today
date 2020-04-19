import { Test, TestingModule } from '@nestjs/testing';
import { IntegrationsResolver } from './integrations.resolver';

describe('IntegrationsResolver', () => {
  let resolver: IntegrationsResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IntegrationsResolver],
    }).compile();

    resolver = module.get<IntegrationsResolver>(IntegrationsResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
