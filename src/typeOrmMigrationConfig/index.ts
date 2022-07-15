import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
config();

type IDataSource = Pick<DataSource, 'options'>;

const connectionConfig: IDataSource = {
  options: {
    type: 'postgres',
    host: process.env.TYPEORM_DB_HOST,
    port: Number(process.env.TYPEORM_DB_PORT),
    username: process.env.TYPEORM_DB_USER_NAME,
    password: process.env.TYPEORM_DB_USER_PASS,
    database: process.env.TYPEORM_DB_NAME,
    dropSchema: true,
    logging: false,
    synchronize: true,
    migrationsRun: true,
    entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    migrations: [__dirname + '/../migrations/*{.ts,.js}'],
  },
};

export class MigrationsConfig extends DataSource {
  constructor(options: DataSourceOptions) {
    super(options);
  }
}

export const dataSource = new MigrationsConfig(connectionConfig.options);
