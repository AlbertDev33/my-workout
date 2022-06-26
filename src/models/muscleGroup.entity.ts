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
  id: string;

  @Column()
  name: string;

  @Column()
  exerciseName: string;

  @Column()
  amount: number;

  @Column()
  repetition: number;

  @Column({ name: 'load_weight' })
  loadWeight: number;

  @ManyToOne(() => Workout, (workout) => workout.muscleGroup)
  @JoinColumn({ name: 'workout_id' })
  workout: Workout;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    super();
    if (!this.id) {
      this.id = v4();
    }
  }
}
