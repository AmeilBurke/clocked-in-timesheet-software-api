import { IsNotEmpty, IsString } from 'class-validator';
// import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateEstablishmentDto {
  @IsString()
  @IsNotEmpty()
  establishmentName: string;
  // @IsNumber()
  // @IsOptional()
  // establishmentManager?: number | null;
}
