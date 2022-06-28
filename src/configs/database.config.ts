import { DATABASE_TYPE } from '../constants';
import { ConfigModule, ConfigService, registerAs } from '@nestjs/config';
import {
  TypeOrmModuleOptions,
  TypeOrmModuleAsyncOptions,
} from '@nestjs/typeorm';

export interface IDatabaseConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  entities: string[];
  migrations: string[];
  cli: {
    migrationsDir: string;
  };
  synchronize: boolean;
  logging: boolean;
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
    entities: ['../models/**/*.entity{.ts,.js}'],
    migrations: ['../migrations/*{.ts,.js}'],
    cli: {
      migrationsDir: '../migrations/',
    },
    synchronize: true,
    logging: true,
  }),
);

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: DATABASE_TYPE,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER_NAME,
      password: process.env.DB_USER_PASS,
      database: process.env.DB_NAME,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      extra: 'utf8mb4_unicode_ci',
      synchronize: false,
      logging: false,
    };
  },
};

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: DATABASE_TYPE,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PASS,
  database: process.env.DB_NAME,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  extra: 'utf8mb4_unicode_ci',
  cli: {
    migrationsDir: __dirname + '/../migrations',
  },
  synchronize: false,
  logging: true,
};
