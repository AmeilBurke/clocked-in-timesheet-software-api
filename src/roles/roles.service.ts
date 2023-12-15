import { Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async create(createRoleDto: CreateRoleDto) {
    try {
      return await this.prisma.role.create({
        data: {
          role_name: createRoleDto.roleName.trim().toLocaleLowerCase(),
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return 'a role already exists with this name.';
        }
      } else {
        return `there was an unknown error: ${error}.`;
      }
    }
  }

  async findAll() {
    return await this.prisma.role.findMany();
  }

  async findOne(id: number) {
    try {
      return await this.prisma.role.findUniqueOrThrow({
        where: { role_id: id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return `no record was found for id: ${id}.`;
      }
    }
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async update(id: number, updateRoleDto: UpdateRoleDto) {
    try {
      return await this.prisma.role.update({
        where: { role_id: id },
        data: { role_name: updateRoleDto.roleName?.trim().toLocaleLowerCase() },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return 'you cannot have 2 or more roles with the same name.';
        } else {
          return error;
        }
      } else {
        return 'unknown error.';
      }
    }
  }

  async remove(id: number) {
    try {
      return await this.prisma.role.delete({
        where: { role_id: id },
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
