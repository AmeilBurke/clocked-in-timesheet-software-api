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
exports.TradesService = void 0;
const client_1 = require("@prisma/client");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
let TradesService = class TradesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createTradeDto) {
        try {
            return await this.prisma.trade.create({
                data: {
                    trade_name: createTradeDto.tradeName.trim().toLocaleLowerCase(),
                },
            });
        }
        catch (error) {
            return `there was an unknown error: ${error}.`;
        }
    }
    async findAll() {
        return await this.prisma.trade.findMany({
            orderBy: { trade_name: 'asc' },
        });
    }
    async findOne(id) {
        try {
            return await this.prisma.trade.findUniqueOrThrow({
                where: { trade_id: id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                return `no record was found for id: ${id}.`;
            }
        }
    }
    async update(id, updateTradeDto) {
        try {
            return await this.prisma.trade.update({
                where: { trade_id: id },
                data: {
                    trade_name: updateTradeDto.tradeName?.trim().toLocaleLowerCase(),
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return 'you cannot have 2 or more trades with the same name.';
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
            return await this.prisma.trade.delete({
                where: { trade_id: id },
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
exports.TradesService = TradesService;
exports.TradesService = TradesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], TradesService);
//# sourceMappingURL=trades.service.js.map