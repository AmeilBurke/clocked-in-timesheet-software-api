import { TradesService } from './trades.service';
import { CreateTradeDto } from './dto/create-trade.dto';
import { UpdateTradeDto } from './dto/update-trade.dto';
export declare class TradesController {
    private readonly tradesService;
    constructor(tradesService: TradesService);
    create(createTradeDto: CreateTradeDto): Promise<string | {
        trade_id: number;
        trade_name: string;
    }>;
    findAll(): Promise<{
        trade_id: number;
        trade_name: string;
    }[]>;
    findOne(id: string): Promise<string | {
        trade_id: number;
        trade_name: string;
    }>;
    update(id: string, updateTradeDto: UpdateTradeDto): Promise<string | {
        trade_id: number;
        trade_name: string;
    } | import("@prisma/client/runtime/library").PrismaClientKnownRequestError>;
    remove(id: string): Promise<unknown>;
}
