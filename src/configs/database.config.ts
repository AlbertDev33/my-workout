import { registerAs } from '@nestjs/config';

export interface IDatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: string[];
}

export const databaseConfig = registerAs(
  'database',
  (): IDatabaseConfig => ({
    type: process.env.DB_TYPE || 'postgres',
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    username: process.env.DB_USER_NAME,
    password: process.env.DB_USER_PASS,
    database: process.env.DB_NAME,
    entities: [`${__dirname}${'../../models/**/*.entity{.ts,.js}'}`],
  }),
);
