export type CustomDataSourceOptions = {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
  dropSchema: boolean;
  logging: boolean;
  synchronize: boolean;
  migrationsRun: boolean;
  entities: string[];
  migrations: string[];
};
