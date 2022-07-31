import { InjectDependencies } from '@constants/index';
import { Workout } from '@models/workout.entity';

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CreateWorkoutService } from './create-workout.service';
import { WorkoutController } from './workout.controller';
import { WorkoutRepository } from './workout.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Workout])],
  providers: [
    CreateWorkoutService,
    {
      provide: InjectDependencies.WorkoutRepository,
      useClass: WorkoutRepository,
    },
  ],
  controllers: [WorkoutController],
})
export class WorkoutModule {}
