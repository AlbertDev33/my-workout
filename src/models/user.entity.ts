import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';

import { Workout } from './workout.entity';

@Entity('user')
export class User extends BaseEntity {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({ name: 'sms_token' })
  smsToken: string;

  @OneToMany(() => Workout, (workout) => workout.user)
  workout: Workout[];

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
