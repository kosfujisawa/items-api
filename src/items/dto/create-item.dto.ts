import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateItemDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsInt()
  price: number;

  @IsOptional()
  @IsString()
  description: string;
}
