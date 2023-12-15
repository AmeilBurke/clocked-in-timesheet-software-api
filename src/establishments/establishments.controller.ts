import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { EstablishmentsService } from './establishments.service';
import { CreateEstablishmentDto } from './dto/create-establishment.dto';
import { UpdateEstablishmentDto } from './dto/update-establishment.dto';

// Controller & services need to be done

@Controller('establishments')
export class EstablishmentsController {
  constructor(private readonly establishmentsService: EstablishmentsService) {}

  @Post()
  create(@Body() createEstablishmentDto: CreateEstablishmentDto) {
    return this.establishmentsService.create(createEstablishmentDto);
  }

  @Get()
  findAll() {
    return this.establishmentsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.establishmentsService.findOne(Number(id));
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateEstablishmentDto: UpdateEstablishmentDto,
  ) {
    return this.establishmentsService.update(
      Number(id),
      updateEstablishmentDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.establishmentsService.remove(Number(id));
  }
}
