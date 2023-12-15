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
exports.AccountsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const client_1 = require("@prisma/client");
let AccountsService = class AccountsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createAccountDto) {
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
                    account_hourly_overtime_rate: createAccountDto.accountHourlyOvertimeRate,
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return 'an account already exists with this email.';
                }
            }
            else {
                return `there was an unknown error: ${error}.`;
            }
        }
    }
    async findAll() {
        return await this.prisma.account.findMany();
    }
    async findOne(id) {
        try {
            if (!id.includes('@')) {
                return await this.prisma.account.findUniqueOrThrow({
                    where: { account_id: Number(id) },
                });
            }
            else {
                return await this.prisma.account.findUniqueOrThrow({
                    where: { account_email: id },
                });
            }
        }
        catch (error) {
            if (error.code === 'P2025') {
                return `no record was found for id: ${id}.`;
            }
        }
    }
    async update(id, updateAccountDto) {
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
            }
            else {
                return await this.prisma.account.update({
                    where: { account_email: id },
                    data: data,
                });
            }
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
                return `there was an unknown error: ${error}.`;
            }
        }
    }
    async remove(id) {
        try {
            if (!id.includes('@')) {
                return await this.prisma.account.delete({
                    where: { account_id: Number(id) },
                });
            }
            else {
                return await this.prisma.account.delete({
                    where: { account_email: id },
                });
            }
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
                return `there was an unknown error: ${error}.`;
            }
        }
    }
};
exports.AccountsService = AccountsService;
exports.AccountsService = AccountsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AccountsService);
//# sourceMappingURL=accounts.service.js.map