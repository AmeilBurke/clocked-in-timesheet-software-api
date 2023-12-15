import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';
import { PrismaService } from 'src/prisma.service';
export declare class AccountsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createAccountDto: CreateAccountDto): Promise<string | {
        account_id: number;
        account_email: string;
        account_password: string;
        account_name: string;
        account_establishment_id: number;
        account_role_id: number;
        account_trade_id: number;
        account_hourly_rate: number;
        account_hourly_overtime_rate: number;
    }>;
    findAll(): Promise<{
        account_id: number;
        account_email: string;
        account_password: string;
        account_name: string;
        account_establishment_id: number;
        account_role_id: number;
        account_trade_id: number;
        account_hourly_rate: number;
        account_hourly_overtime_rate: number;
    }[]>;
    findOne(id: string): Promise<string | {
        account_id: number;
        account_email: string;
        account_password: string;
        account_name: string;
        account_establishment_id: number;
        account_role_id: number;
        account_trade_id: number;
        account_hourly_rate: number;
        account_hourly_overtime_rate: number;
    }>;
    update(id: string, updateAccountDto: UpdateAccountDto): Promise<unknown>;
    remove(id: string): Promise<unknown>;
}
