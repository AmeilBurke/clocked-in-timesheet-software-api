import { TimesheetsService } from './timesheets.service';
import { CreateTimesheetDto } from './dto/create-timesheet.dto';
import { UpdateTimesheetDto } from './dto/update-timesheet.dto';
export declare class TimesheetsController {
    private readonly timesheetsService;
    constructor(timesheetsService: TimesheetsService);
    create(createTimesheetDto: CreateTimesheetDto): Promise<string | {
        timesheet_id: number;
        timesheet_name: string;
        timesheet_account_id: number;
        timesheet_start_date: Date;
        timesheet_end_date: Date;
    }>;
    findAll(): Promise<{
        timesheet_id: number;
        timesheet_name: string;
        timesheet_account_id: number;
        timesheet_start_date: Date;
        timesheet_end_date: Date;
    }[]>;
    findOne(id: string): Promise<string | {
        timesheet_id: number;
        timesheet_name: string;
        timesheet_account_id: number;
        timesheet_start_date: Date;
        timesheet_end_date: Date;
    }>;
    update(id: string, updateTimesheetDto: UpdateTimesheetDto): Promise<import("@prisma/client/runtime/library").PrismaClientKnownRequestError | "unknown error." | {
        timesheet_id: number;
        timesheet_name: string;
        timesheet_account_id: number;
        timesheet_start_date: Date;
        timesheet_end_date: Date;
    } | "you cannot have 2 or more timesheets with the same name.">;
    remove(id: string): Promise<unknown>;
}
