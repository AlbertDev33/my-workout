import { createConnection, getConnection } from 'typeorm';

export const connection = {
  create: async () => {
    await createConnection();
  },
  close: async () => {
    await getConnection().close();
  },
  clear: async () => {
    const connection = getConnection();
    const entities = connection.entityMetadatas;

    const clearConnection = entities.map(async (entity) => {
      const repository = connection.getRepository(entity.name);
      const result = await repository.query(`DELETE FROM ${entity.tableName}`);
      return result;
    });

    await Promise.all(clearConnection);
  },
};
