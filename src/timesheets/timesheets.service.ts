import { Injectable } from '@nestjs/common';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { Cron } from '@nestjs/schedule';

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
        return error.message;
      } else {
        return `there was an unknown error: ${error}.`;
      }
    }
  }

  @Cron('0 0 * * *')
  async createAutoTimesheet() {
    try {
      const allWorkerAccounts = this.prisma.account.findMany({
        where: {
          account_role_id: 1004,
        },
      });

      const currentDate = new Date();
      const dateInSevenDays = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        currentDate.getDate() + 7,
      );

      (await allWorkerAccounts).forEach(async (workerAccount) => {
        await this.prisma.timesheet.create({
          data: {
            timesheet_name: `timesheet - ${
              workerAccount.account_name
            } -  ending ${dateInSevenDays.getDate()}/${dateInSevenDays.getMonth()}/${dateInSevenDays.getFullYear()}`,
            timesheet_start_date: currentDate,
            timesheet_end_date: dateInSevenDays,
            timesheet_account_id: workerAccount.account_id,
          },
        });
      });
    } catch (error) {
      console.log(`error creating timesheet: ${error}`);
    }
  }

  async findAll() {
    return await this.prisma.timesheet.findMany({
      orderBy: {
        timesheet_start_date: 'asc',
      },
    });
  }

  async findOne(id: number) {
    try {
      return await this.prisma.timesheet.findUniqueOrThrow({
        where: { timesheet_id: id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return `no record was found for timesheet: ${id}.`;
      }
    }
  }

  async update(id: number, updateTimesheetDto: UpdateTimesheetDto) {
    try {
      return await this.prisma.timesheet.update({
        where: { timesheet_id: id },
        data: {
          timesheet_name: updateTimesheetDto.timesheetName
            .trim()
            .toLocaleLowerCase(),
          timesheet_start_date: updateTimesheetDto.timesheetStartDate,
          timesheet_end_date: updateTimesheetDto.timesheetEndDate,
          timesheet_account_id: updateTimesheetDto.timesheetAccountId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return 'you cannot have 2 or more timesheets with the same name.';
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
      return await this.prisma.timesheet.delete({
        where: { timesheet_id: id },
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
