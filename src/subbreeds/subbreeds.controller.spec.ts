import { Test, TestingModule } from '@nestjs/testing';
import { SubbreedsController } from './subbreeds.controller';

describe('SubbreedsController', () => {
  let controller: SubbreedsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubbreedsController],
    }).compile();

    controller = module.get<SubbreedsController>(SubbreedsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
