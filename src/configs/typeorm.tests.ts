import { getConnection, createConnection } from 'typeorm';
import { createDatabase, dropDatabase } from 'typeorm-extension';

export const connection = {
  crateDatabase: async () => {
    const config = {
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
    };
    await createDatabase({
      ifNotExist: true,
      options: config,
    });
  },
  createConnection: async () => {
    await createConnection();
    const connection = getConnection();
    return connection;
  },
  close: async () => {
    await getConnection().close();
  },
  clear: async () => {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    const clearConnection = entities.map(async (entity) => {
      const repository = connection.getRepository(entity.name);
      await repository.query(`DELETE FROM ${entity.tableName}`);
    });

    await Promise.all(clearConnection);
  },
  drop: async () => {
    await dropDatabase({ ifExist: true });
  },
};
