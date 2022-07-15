import { Module } from '@nestjs/common';

import { MigrationsConfig } from './index';

@Module({
  providers: [MigrationsConfig],
  exports: [MigrationsConfig],
})
export class MigrationsConfigModule {}
