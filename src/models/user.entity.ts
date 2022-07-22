import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Generated,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';
import { v4 } from 'uuid';

import { Workout } from './workout.entity';

@Entity('users')
export class User extends BaseEntity {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'confirmed_email', default: false })
  confirmedEmail: boolean;

  @Column({ name: 'confirmed_phone', default: false })
  confirmedPhone: boolean;

  @Column({ name: 'phone_number' })
  phoneNumber: string;

  @Column({ name: 'sms_token', nullable: true })
  smsToken: string;

  @Column({ name: 'user_token' })
  @Generated('uuid')
  userToken: string;

  @Column({ name: 'hash_token', nullable: true })
  hashToken: string;

  @OneToMany(() => Workout, (workout) => workout.user)
  workout: Workout[];

  // @CreateDateColumn()
  @Column()
  created_at: Date;

  // @UpdateDateColumn()
  @Column()
  updated_at: Date;

  constructor() {
    super();
    if (!this.created_at) {
      this.created_at = new Date();
    }
    if (!this.updated_at) {
      this.updated_at = new Date();
    }
  }
}
