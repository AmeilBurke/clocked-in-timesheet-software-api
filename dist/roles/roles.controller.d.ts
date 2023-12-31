import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
export declare class RolesController {
    private readonly rolesService;
    constructor(rolesService: RolesService);
    create(createRoleDto: CreateRoleDto): Promise<string | {
        role_id: number;
        role_name: string;
    }>;
    findAll(): Promise<{
        role_id: number;
        role_name: string;
    }[]>;
    findOne(id: string): Promise<string | {
        role_id: number;
        role_name: string;
    }>;
    update(id: string, updateRoleDto: UpdateRoleDto): Promise<import("@prisma/client/runtime/library").PrismaClientKnownRequestError | "unknown error." | {
        role_id: number;
        role_name: string;
    } | "you cannot have 2 or more roles with the same name.">;
    remove(id: string): Promise<unknown>;
}
