import { JobsService } from './jobs.service';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
export declare class JobsController {
    private readonly jobsService;
    constructor(jobsService: JobsService);
    create(createJobDto: CreateJobDto): Promise<string | {
        job_id: number;
        job_display_name: string;
        job_location: number;
        job_start_time: Date;
        job_end_time: Date;
        job_notes: string;
        job_standard_hours_worked: number;
        job_overtime_hours_worked: number;
        job_timesheet_id: number;
    }>;
    findAll(): Promise<{
        job_id: number;
        job_display_name: string;
        job_location: number;
        job_start_time: Date;
        job_end_time: Date;
        job_notes: string;
        job_standard_hours_worked: number;
        job_overtime_hours_worked: number;
        job_timesheet_id: number;
    }[]>;
    findOne(id: string): Promise<string | {
        job_id: number;
        job_display_name: string;
        job_location: number;
        job_start_time: Date;
        job_end_time: Date;
        job_notes: string;
        job_standard_hours_worked: number;
        job_overtime_hours_worked: number;
        job_timesheet_id: number;
    }>;
    update(id: string, updateJobDto: UpdateJobDto): Promise<unknown>;
    remove(id: string): Promise<unknown>;
}
