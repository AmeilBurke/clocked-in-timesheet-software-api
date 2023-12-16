import { Module } from '@nestjs/common';
import { TimesheetsService } from './timesheets.service';
import { TimesheetsController } from './timesheets.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TimesheetsController],
  providers: [TimesheetsService, PrismaService],
})
export class TimesheetsModule {}
