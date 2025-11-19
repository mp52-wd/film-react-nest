import {
  IsString,
  IsNumber,
  IsArray,
  IsOptional,
  IsDateString,
  Min,
} from 'class-validator';

export class SessionDto {
  @IsString()
  id: string;

  @IsDateString()
  daytime: string;

  @IsNumber()
  hall: number;

  @IsNumber()
  @Min(1)
  rows: number;

  @IsNumber()
  @Min(1)
  seats: number;

  @IsNumber()
  @Min(0)
  price: number;

  @IsArray()
  @IsString({ each: true })
  taken: string[];
}

export class FilmDto {
  @IsString()
  id: string;

  @IsNumber()
  rating: number;

  @IsString()
  director: string;

  @IsArray()
  @IsString({ each: true })
  tags: string[];

  @IsString()
  image: string;

  @IsString()
  cover: string;

  @IsString()
  title: string;

  @IsString()
  about: string;

  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  schedule?: SessionDto[];
}
