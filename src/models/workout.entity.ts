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

  @Column()
  date: string;

  @Column({ name: 'workout_time' })
  workoutTime: string;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @OneToMany(() => MuscleGroup, (muscleGroup) => muscleGroup.workout)
  @JoinColumn({ name: 'muscle_group_id' })
  muscleGroup: MuscleGroup[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    super();
    if (!this.id) {
      this.id = v4();
    }
  }
}
