import { Injectable } from '@nestjs/common';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

// put try catches in
@Injectable()
export class EstablishmentsService {
  constructor(private prisma: PrismaService) {}

  async create(createEstablishmentDto: CreateEstablishmentDto) {
    try {
      return await this.prisma.establishment.create({
        data: {
          establishment_name: createEstablishmentDto.establishmentName
            .trim()
            .toLocaleLowerCase(),
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return 'a establishment already exists with this name.';
        }
      } else {
        return `there was an unknown error: ${error}.`;
      }
    }
  }

  async findAll() {
    return await this.prisma.establishment.findMany({
      orderBy: { establishment_name: 'asc' },
    });
  }

  async findOne(id: number) {
    try {
      return await this.prisma.establishment.findUniqueOrThrow({
        where: { establishment_id: id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return `no record was found for id: ${id}.`;
      }
    }
  }

  async update(id: number, updateEstablishmentDto: UpdateEstablishmentDto) {
    try {
      return this.prisma.establishment.update({
        where: { establishment_id: id },
        data: {
          establishment_name: updateEstablishmentDto.establishmentName
            ?.trim()
            .toLocaleLowerCase(),
        },
      });
    } catch (error) {
      return `there was an unknown error: ${error}.`;
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.establishment.delete({
        where: { establishment_id: id },
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
