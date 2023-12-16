export class CreateJobDto {
  jobDisplayName: string;
  jobLocation: number;
  jobStartTime: string;
  jobEndTime: string | null;
  jobNotes: string | null;
  jobStandardHoursWorked: number | null;
  jobOvertimeHoursWorked: number | null;
  jobTimesheetId: number | null;
}
