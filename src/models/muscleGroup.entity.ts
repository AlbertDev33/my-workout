import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';

import { Workout } from './workout.entity';

@Entity('muscle_group')
export class MuscleGroup extends BaseEntity {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column({ name: 'exercise_name' })
  exerciseName: string;

  @Column()
  amount: number;

  @Column()
  repetition: number;

  @Column({ nullable: true })
  technique?: string;

  @Column({ name: 'load_weight' })
  loadWeight: number;

  @ManyToOne(() => Workout)
  @JoinColumn({ name: 'workout_id' })
  workout: Workout;

  @Column({ name: 'workout_id' })
  workoutId: string;

  @CreateDateColumn({ type: 'time without time zone' })
  created_at: Date;

  @UpdateDateColumn({ type: 'time without time zone' })
  updated_at: Date;

  constructor() {
    super();
    if (!this.id) {
      this.id = v4();
    }
  }
}
