import { Test, TestingModule } from '@nestjs/testing';
import { CreateWorkoutService } from './workout.service';

describe('WorkoutService', () => {
  let service: CreateWorkoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CreateWorkoutService],
    }).compile();

    service = module.get<CreateWorkoutService>(CreateWorkoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
