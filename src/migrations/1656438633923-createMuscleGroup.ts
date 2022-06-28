import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createMuscleGroup1656438633923 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'muscle_group',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'workout_id',
            type: 'uuid',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'exercise_name',
            type: 'varchar',
          },
          {
            name: 'amount',
            type: 'numeric',
          },
          {
            name: 'repetition',
            type: 'numeric',
          },
          {
            name: 'technique',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'load_weight',
            type: 'numeric',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'FKWorkout',
            referencedTableName: 'workout',
            referencedColumnNames: ['id'],
            columnNames: ['workout_id'],
            onDelete: 'SET NULL',
            onUpdate: 'SET NULL',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('muscle_group');
  }
}
