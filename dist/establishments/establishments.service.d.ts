import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
import { PrismaService } from 'src/prisma.service';
export declare class EstablishmentsService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createEstablishmentDto: CreateEstablishmentDto): Promise<string | {
        establishment_id: number;
        establishment_name: string;
    }>;
    findAll(): Promise<{
        establishment_id: number;
        establishment_name: string;
    }[]>;
    findOne(id: number): Promise<string | {
        establishment_id: number;
        establishment_name: string;
    }>;
    update(id: number, updateEstablishmentDto: UpdateEstablishmentDto): Promise<string | {
        establishment_id: number;
        establishment_name: string;
    }>;
    remove(id: number): Promise<unknown>;
}
