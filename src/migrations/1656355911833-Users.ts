import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Users1656355911833 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'email',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'confirmed_email',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'confirmed_phone',
            type: 'boolean',
            isNullable: true,
          },
          {
            name: 'phone_number',
            type: 'varchar',
          },
          {
            name: 'user_token',
            type: 'uuid',
            generationStrategy: 'uuid',
            isGenerated: true,
          },
          {
            name: 'sms_token',
            type: 'varchar',
            isNullable: true,
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
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('users');
  }
}
