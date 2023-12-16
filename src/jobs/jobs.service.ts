import { Injectable } from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class JobsService {
  constructor(private prisma: PrismaService) {}
  async create(createJobDto: CreateJobDto) {
    try {
      const date = createJobDto.jobStartTime.split(' ')[0].split('-');
      const time = createJobDto.jobStartTime.split(' ')[1].split(':');

      const convertedDate = new Date(
        Number(date[0]),
        Number(date[1]) - 1,
        Number(date[2]),
        Number(time[0]) + 13,
        Number(time[1]),
        Number(time[2]),
      );

      return await this.prisma.job.create({
        data: {
          job_display_name: createJobDto.jobDisplayName
            .trim()
            .toLocaleLowerCase(),
          job_location: createJobDto.jobLocation,
          job_start_time: convertedDate,
        },
      });
    } catch (error) {
      return `${error}`;
    }
  }

  async findAll() {
    return await this.prisma.job.findMany({
      orderBy: {
        job_start_time: 'desc',
      },
    });
  }

  async findOne(id: number) {
    try {
      return await this.prisma.job.findUniqueOrThrow({
        where: { job_id: id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        return `no record was found for job id: ${id}.`;
      }
    }
  }

  async update(id: number, updateJobDto: UpdateJobDto) {
    try {
      let convertedStartDate: Date;
      let convertedEndDate: Date;

      if (updateJobDto.jobStartTime) {
        const startDate = updateJobDto.jobStartTime.split(' ')[0].split('-');
        const startTime = updateJobDto.jobStartTime.split(' ')[1].split(':');

        convertedStartDate = new Date(
          Number(startDate[0]),
          Number(startDate[1]) - 1,
          Number(startDate[2]),
          Number(startTime[0]) + 13,
          Number(startTime[1]),
          Number(startTime[2]),
        );
      }

      if (updateJobDto.jobEndTime) {
        const endDate = updateJobDto.jobEndTime.split(' ')[0].split('-');
        const endTime = updateJobDto.jobEndTime.split(' ')[1].split(':');

        convertedEndDate = new Date(
          Number(endDate[0]),
          Number(endDate[1]) - 1,
          Number(endDate[2]),
          Number(endTime[0]) + 13,
          Number(endTime[1]),
          Number(endTime[2]),
        );
      }

      return await this.prisma.job.update({
        where: { job_id: id },
        data: {
          job_display_name: updateJobDto.jobDisplayName
            .trim()
            .toLocaleLowerCase(),
          job_location: updateJobDto.jobLocation,
          job_start_time:
            convertedStartDate === undefined
              ? updateJobDto.jobStartTime
              : convertedStartDate,
          job_end_time:
            convertedEndDate === undefined
              ? updateJobDto.jobEndTime
              : convertedEndDate,
          job_notes: updateJobDto.jobNotes.trim().toLocaleLowerCase(),
          job_standard_hours_worked: updateJobDto.jobStandardHoursWorked,
          job_overtime_hours_worked: updateJobDto.jobOvertimeHoursWorked,
          job_timesheet_id: updateJobDto.jobTimesheetId,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return error.meta?.cause;
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
      return await this.prisma.job.delete({
        where: { job_id: id },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2025') {
          return error.meta?.cause;
        } else {
          return error;
        }
      } else {
        return `there was an unknown error: ${error}.`;
      }
    }
  }
}
