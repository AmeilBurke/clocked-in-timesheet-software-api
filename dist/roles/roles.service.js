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
exports.RolesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma.service");
const client_1 = require("@prisma/client");
let RolesService = class RolesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(createRoleDto) {
        try {
            return await this.prisma.role.create({
                data: {
                    role_name: createRoleDto.roleName.trim().toLocaleLowerCase(),
                },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return 'a role already exists with this name.';
                }
            }
            else {
                return `there was an unknown error: ${error}.`;
            }
        }
    }
    async findAll() {
        return await this.prisma.role.findMany();
    }
    async findOne(id) {
        try {
            return await this.prisma.role.findUniqueOrThrow({
                where: { role_id: id },
            });
        }
        catch (error) {
            if (error.code === 'P2025') {
                return `no record was found for id: ${id}.`;
            }
        }
    }
    async update(id, updateRoleDto) {
        try {
            return await this.prisma.role.update({
                where: { role_id: id },
                data: { role_name: updateRoleDto.roleName?.trim().toLocaleLowerCase() },
            });
        }
        catch (error) {
            if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    return 'you cannot have 2 or more roles with the same name.';
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
            return await this.prisma.role.delete({
                where: { role_id: id },
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
exports.RolesService = RolesService;
exports.RolesService = RolesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RolesService);
//# sourceMappingURL=roles.service.js.map