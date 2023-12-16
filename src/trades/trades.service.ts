/* eslint-disable @typescript-eslint/no-unused-vars */
import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TradesService {
  constructor(private prisma: PrismaService) {}

  async create(createTradeDto: CreateTradeDto) {
    try {
      return await this.prisma.trade.create({
        data: {
          trade_name: createTradeDto.tradeName.trim().toLocaleLowerCase(),
        },
      });
    } catch (error) {
      return `there was an unknown error: ${error}.`;
    }
  }

  async findAll() {
    return await this.prisma.trade.findMany({
      orderBy: { trade_name: 'asc' },
    });
  }

  async findOne(id: number) {
    try {
      return await this.prisma.trade.findUniqueOrThrow({
        where: { trade_id: id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return `no record was found for id: ${id}.`;
      }
    }
  }

  async update(id: number, updateTradeDto: UpdateTradeDto) {
    try {
      return await this.prisma.trade.update({
        where: { trade_id: id },
        data: {
          trade_name: updateTradeDto.tradeName?.trim().toLocaleLowerCase(),
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return 'you cannot have 2 or more trades with the same name.';
        } else {
          return error;
        }
      } else {
        return `there was an unknown error: ${error}.`;
      }
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.trade.delete({
        where: { trade_id: id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return error.meta?.cause;
        } else {
          return error;
        }
      } else {
        return 'unknown error.';
      }
    }
  }
}
