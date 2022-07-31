import { Module } from '@nestjs/common';

import { CreateWorkoutService } from './create-workout.service';
import { WorkoutController } from './workout.controller';

@Module({
  providers: [CreateWorkoutService],
  controllers: [WorkoutController],
})
export class WorkoutModule {}
