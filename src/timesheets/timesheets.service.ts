import { Injectable } from '@nestjs/common';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TimesheetsService {
  constructor(private prisma: PrismaService) {}

  async create(createTimesheetDto: CreateTimesheetDto) {
    try {
      return await this.prisma.timesheet.create({
        data: {
          timesheet_name: createTimesheetDto.timesheetName,
          timesheet_start_date: createTimesheetDto.timesheetStartDate,
          timesheet_account_id: createTimesheetDto.timesheetAccountId,
          timesheet_end_date: createTimesheetDto.timesheetEndDate,
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
    return await this.prisma.role.findMany({
      orderBy: {
        role_name: 'asc',
      },
    });
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
