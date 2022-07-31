import { Module } from '@nestjs/common';

import { CreateIdService } from './create-id.service';

@Module({
  providers: [CreateIdService],
  exports: [CreateIdService],
})
export class CreateIdModule {}
