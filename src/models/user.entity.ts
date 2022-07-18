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

  @Column({ name: 'confirmed_email', nullable: true })
  confirmedEmail: boolean;

  @Column({ name: 'confirmed_phone', nullable: true })
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
