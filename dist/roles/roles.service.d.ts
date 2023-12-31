import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
export declare class RolesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createRoleDto: CreateRoleDto): Promise<string | {
        role_id: number;
        role_name: string;
    }>;
    findAll(): Promise<{
        role_id: number;
        role_name: string;
    }[]>;
    findOne(id: number): Promise<string | {
        role_id: number;
        role_name: string;
    }>;
    update(id: number, updateRoleDto: UpdateRoleDto): Promise<Prisma.PrismaClientKnownRequestError | "unknown error." | {
        role_id: number;
        role_name: string;
    } | "you cannot have 2 or more roles with the same name.">;
    remove(id: number): Promise<unknown>;
}
