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
          trade_name: createTradeDto.tradeName,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return 'A trade already exists with this name.';
        }
      } else {
        return `There was an unknown error: ${error}`;
      }
    }
  }

  async findAll() {
    return await this.prisma.trade.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.prisma.trade.findUniqueOrThrow({
        where: { trade_id: id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return `No record was found for id: ${id}.`;
      }
    }
  }

  async update(id: number, updateTradeDto: UpdateTradeDto) {
    try {
      return await this.prisma.trade.update({
        where: { trade_id: id },
        data: { trade_name: updateTradeDto.tradeName },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return 'You cannot have 2 or more trades with the same name';
        } else {
          return error;
        }
      } else {
        return 'unknown error';
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
        return 'unknown error';
      }
    }
  }
}
