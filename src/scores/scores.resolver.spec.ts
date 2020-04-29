import { Test, TestingModule } from '@nestjs/testing';
import { ScoresResolver } from './scores.resolver';

describe('ScoresResolver', () => {
  let resolver: ScoresResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ScoresResolver],
    }).compile();

    resolver = module.get<ScoresResolver>(ScoresResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
