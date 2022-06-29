import { DATABASE_TYPE } from '../constants';
import { ConfigModule, ConfigService } from '@nestjs/config';
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

// export const typeOrmAsyncConfig = registerAs(
//   'database',
//   (): IDatabaseConfig => ({
//     type: DATABASE_TYPE,
//     host: process.env.DB_HOST,
//     port: Number(process.env.DB_PORT),
//     username: process.env.DB_USER_NAME,
//     password: process.env.DB_USER_PASS,
//     database: process.env.DB_NAME,
//     entities: [__dirname + '/../**/*.entity{.ts,.js}'],
//     migrations: [__dirname + '/../migrations/*{.ts,.js}'],
//     cli: {
//       migrationsDir: __dirname + '/../migrations',
//     },
//     synchronize: false,
//     logging: false,
//   }),
// );

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
  dropSchema: true,
  migrationsRun: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  extra: 'utf8mb4_unicode_ci',
  synchronize: false,
  logging: true,
};
