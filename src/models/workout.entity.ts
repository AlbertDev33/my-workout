import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';

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
