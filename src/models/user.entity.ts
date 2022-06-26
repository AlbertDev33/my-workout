import { BaseEntity, Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
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

  @OneToMany(() => Workout, (workout) => workout.user)
  workout: Workout[];

  constructor() {
    super();
    if (!this.id) {
      this.id = v4();
    }
  }
}
