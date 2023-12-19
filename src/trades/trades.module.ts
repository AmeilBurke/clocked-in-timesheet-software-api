import { Module } from '@nestjs/common';
import { TradesService } from './trades.service';
import { TradesController } from './trades.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TradesController],
  providers: [TradesService, PrismaService, ],
})
export class TradesModule {}
