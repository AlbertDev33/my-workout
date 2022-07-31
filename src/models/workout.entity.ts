import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
} from 'typeorm';

import { MuscleGroup } from './muscleGroup.entity';
import { User } from './user.entity';

@Entity('workout')
export class Workout extends BaseEntity {
  @PrimaryColumn()
  id?: string;

  @Column({ type: 'time without time zone' })
  date: Date;

  @Column({ name: 'workout_time' })
  workoutTime: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column({ name: 'user_id' })
  userId: string;

  @OneToMany(() => MuscleGroup, (muscleGroup) => muscleGroup.workout)
  muscleGroup: MuscleGroup[];

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'updated_at' })
  updatedAt: Date;

  constructor() {
    super();
    if (!this.createdAt) {
      this.createdAt = new Date();
    }
    if (!this.updatedAt) {
      this.updatedAt = new Date();
    }
  }
}
