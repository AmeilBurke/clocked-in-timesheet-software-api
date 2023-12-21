import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class TimesheetsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTimesheetDto: CreateTimesheetDto): Promise<string | {
        timesheet_id: number;
        timesheet_name: string;
        timesheet_account_id: number;
        timesheet_start_date: Date;
        timesheet_end_date: Date;
    }>;
    createAutoTimesheet(): Promise<void>;
    findAll(): Promise<{
        timesheet_id: number;
        timesheet_name: string;
        timesheet_account_id: number;
        timesheet_start_date: Date;
        timesheet_end_date: Date;
    }[]>;
    findOne(id: number): Promise<string | {
        timesheet_id: number;
        timesheet_name: string;
        timesheet_account_id: number;
        timesheet_start_date: Date;
        timesheet_end_date: Date;
    }>;
    update(id: number, updateTimesheetDto: UpdateTimesheetDto): Promise<Prisma.PrismaClientKnownRequestError | "unknown error." | {
        timesheet_id: number;
        timesheet_name: string;
        timesheet_account_id: number;
        timesheet_start_date: Date;
        timesheet_end_date: Date;
    } | "you cannot have 2 or more timesheets with the same name.">;
    remove(id: number): Promise<unknown>;
}
