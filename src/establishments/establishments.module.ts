import { Module } from '@nestjs/common';
import { EstablishmentsService } from './establishments.service';
import { EstablishmentsController } from './establishments.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [EstablishmentsController],
  providers: [EstablishmentsService, PrismaService],
})
export class EstablishmentsModule {}
