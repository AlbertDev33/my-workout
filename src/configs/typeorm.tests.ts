import { DataSource } from 'typeorm';
import {
  createDatabase,
  dropDatabase,
  DatabaseCreateContext,
} from 'typeorm-extension';

const connectionConfig: DatabaseCreateContext = {
  options: {
    name: 'default',
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'postgres',
    database: 'tests',
    dropSchema: true,
    logging: false,
    synchronize: true,
    migrationsRun: true,
    entities: [
      __dirname + '/../**/*.entity{.ts,.js}',
      __dirname + '../../dist/src/**/*entity{.ts,.js}',
    ],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  },
};

const dataSource = new DataSource(connectionConfig.options);

export const connection = {
  crateDatabase: async () => {
    await createDatabase({
      ifNotExist: true,
      options: connectionConfig.options,
    });
  },
  createConnection: async () => {
    await dataSource.initialize();
  },
  repository: () => {
    return dataSource;
  },
  close: async () => {
    await dataSource.destroy();
  },
  drop: async () => {
    await dropDatabase({ ifExist: true, options: connectionConfig.options });
  },
};
