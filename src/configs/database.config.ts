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

export const typeOrmAsyncConfig: TypeOrmModuleAsyncOptions = {
  imports: [ConfigModule],
  inject: [ConfigService],
  useFactory: async (): Promise<TypeOrmModuleOptions> => {
    return {
      type: 'postgres',
      host: process.env.TYPEORM_DB_HOST,
      port: Number(process.env.TYPEORM_DB_PORT),
      username: process.env.TYPEORM_DB_USER_NAME,
      password: process.env.TYPEORM_DB_USER_PASS,
      database: process.env.TYPEORM_DB_NAME,
      migrationsRun: false,
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      synchronize: false,
      logging: false,
    };
  },
};
