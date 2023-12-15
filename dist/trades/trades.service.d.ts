import { Prisma } from '@prisma/client';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
import { PrismaService } from 'src/prisma.service';
export declare class TradesService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createTradeDto: CreateTradeDto): Promise<string | {
        trade_id: number;
        trade_name: string;
    }>;
    findAll(): Promise<{
        trade_id: number;
        trade_name: string;
    }[]>;
    findOne(id: number): Promise<string | {
        trade_id: number;
        trade_name: string;
    }>;
    update(id: number, updateTradeDto: UpdateTradeDto): Promise<string | {
        trade_id: number;
        trade_name: string;
    } | Prisma.PrismaClientKnownRequestError>;
    remove(id: number): Promise<unknown>;
}
