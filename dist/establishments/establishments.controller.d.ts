import { EstablishmentsService } from './establishments.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';
export declare class EstablishmentsController {
    private readonly establishmentsService;
    constructor(establishmentsService: EstablishmentsService);
    create(createEstablishmentDto: CreateEstablishmentDto): Promise<string | {
        establishment_id: number;
        establishment_name: string;
    }>;
    findAll(): Promise<{
        establishment_id: number;
        establishment_name: string;
    }[]>;
    findOne(id: string): Promise<string | {
        establishment_id: number;
        establishment_name: string;
    }>;
    update(id: string, updateEstablishmentDto: UpdateEstablishmentDto): Promise<string | {
        establishment_id: number;
        establishment_name: string;
    }>;
    remove(id: string): Promise<unknown>;
}
