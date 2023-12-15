import { IsEmail } from 'class-validator';

export class CreateAccountDto {
  @IsEmail()
  accountEmail: string;
  accountPassword: string;
  accountName: string;
  accountEstablishmentId: number | null;
  accountRoleId: number | null;
  accountTradeId: number | null;
  accountHourlyRate: number | null;
  accountHourlyOvertimeRate: number | null;
}
