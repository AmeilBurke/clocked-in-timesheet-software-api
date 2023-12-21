"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimesheetsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const prisma_service_1 = require("../prisma.service");
const schedule_1 = require("@nestjs/schedule");
let TimesheetsService = class TimesheetsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTimesheetDto) {
        try {
            return await this.prisma.timesheet.create({
                data: {
                    timesheet_name: createTimesheetDto.timesheetName,
                    timesheet_start_date: createTimesheetDto.timesheetStartDate,
                    timesheet_account_id: createTimesheetDto.timesheetAccountId,
                    timesheet_end_date: createTimesheetDto.timesheetEndDate,
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                return error.message;
            }
            else {
                return `there was an unknown error: ${error}.`;
            }
        }
    }
    async createAutoTimesheet() {
        try {
            const allWorkerAccounts = this.prisma.account.findMany({
                where: {
                    account_role_id: 1004,
                },
            });
            const currentDate = new Date();
            const dateInSevenDays = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate() + 7);
            (await allWorkerAccounts).forEach(async (workerAccount) => {
                await this.prisma.timesheet.create({
                    data: {
                        timesheet_name: `timesheet - ${workerAccount.account_name} -  ending ${dateInSevenDays.getDate()}/${dateInSevenDays.getMonth()}/${dateInSevenDays.getFullYear()}`,
                        timesheet_start_date: currentDate,
                        timesheet_end_date: dateInSevenDays,
                        timesheet_account_id: workerAccount.account_id,
                    },
                });
            });
        }
        catch (error) {
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
    async findOne(id) {
        try {
            return await this.prisma.timesheet.findUniqueOrThrow({
                where: { timesheet_id: id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                return `no record was found for timesheet: ${id}.`;
            }
        }
    }
    async update(id, updateTimesheetDto) {
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
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return 'you cannot have 2 or more timesheets with the same name.';
                }
                else {
                    return error;
                }
            }
            else {
                return 'unknown error.';
            }
        }
    }
    async remove(id) {
        try {
            return await this.prisma.timesheet.delete({
                where: { timesheet_id: id },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2025') {
                    return error.meta?.cause;
                }
                else {
                    return error;
                }
            }
            else {
                return 'unknown error.';
            }
        }
    }
};
exports.TimesheetsService = TimesheetsService;
__decorate([
    (0, schedule_1.Cron)('0 0 * * *'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TimesheetsService.prototype, "createAutoTimesheet", null);
exports.TimesheetsService = TimesheetsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TimesheetsService);
//# sourceMappingURL=timesheets.service.js.map