import { Test, TestingModule } from '@nestjs/testing';
import { SubbreedsService } from './subbreeds.service';

describe('SubbreedsService', () => {
  let service: SubbreedsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SubbreedsService],
    }).compile();

    service = module.get<SubbreedsService>(SubbreedsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
