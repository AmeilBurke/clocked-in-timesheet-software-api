import { Injectable } from '@nestjs/common';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class AccountsService {
  constructor(private prisma: PrismaService) {}

  async create(createAccountDto: CreateAccountDto) {
    try {
      return await this.prisma.account.create({
        data: {
          account_email: createAccountDto.accountEmail
            .trim()
            .toLocaleLowerCase(),
          account_password: createAccountDto.accountPassword
            .trim()
            .toLocaleLowerCase(),
          account_name: createAccountDto.accountName.trim().toLocaleLowerCase(),
          account_establishment_id: createAccountDto.accountEstablishmentId,
          account_role_id: createAccountDto.accountRoleId,
          account_trade_id: createAccountDto.accountTradeId,
          account_hourly_rate: createAccountDto.accountHourlyRate,
          account_hourly_overtime_rate:
            createAccountDto.accountHourlyOvertimeRate,
        },
      });
    } catch (error) {
      if (error instanceof Prisma.PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          return 'an account already exists with this email.';
        }
      } else {
        return `there was an unknown error: ${error}.`;
      }
    }
  }

  async findAll() {
    return await this.prisma.account.findMany();
  }

  async findOne(id: string) {
    try {
      if (!id.includes('@')) {
        return await this.prisma.account.findUniqueOrThrow({
          where: { account_id: Number(id) },
        });
      } else {
        return await this.prisma.account.findUniqueOrThrow({
          where: { account_email: id },
        });
      }
    } catch (error) {
      if (error.code === 'P2025') {
        return `no record was found for id: ${id}.`;
      }
    }
  }

  async update(id: string, updateAccountDto: UpdateAccountDto) {
    try {
      const data = {
        account_email: updateAccountDto.accountEmail?.trim().toLocaleLowerCase(),
        account_password: updateAccountDto.accountPassword?.trim().toLocaleLowerCase(),
        account_name: updateAccountDto.accountName?.trim().toLocaleLowerCase(),
        account_establishment_id: updateAccountDto.accountEstablishmentId,
        account_role_id: updateAccountDto.accountRoleId,
        account_trade_id: updateAccountDto.accountTradeId,
        account_hourly_rate: updateAccountDto.accountHourlyRate,
        account_hourly_overtime_rate: updateAccountDto.accountHourlyOvertimeRate,
      };

      if (!id.includes('@')) {
        return await this.prisma.account.update({
          where: { account_id: Number(id) },
          data: data,
        });
      } else {
        return await this.prisma.account.update({
          where: { account_email: id },
          data: data,
        });
      }
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

  async remove(id: string) {
    try {
      if (!id.includes('@')) {
        return await this.prisma.account.delete({
          where: { account_id: Number(id) },
        });
      } else {
        return await this.prisma.account.delete({
          where: { account_email: id },
        });
      }
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
