import {
  IsBoolean,
  IsOptional,
  IsString,
  IsInt,
  IsNotEmpty,
  ArrayNotEmpty,
  ArrayMinSize,
  ValidateNested,
  IsNumber,
} from 'class-validator';
import { CreatePriceDto, PriceResponseDto } from './create-price.dto';
import { Type } from 'class-transformer';

export class CreatePackageDto {
  @IsNotEmpty()
  @IsString()
  titleEn: string;

  @IsNotEmpty()
  @IsString()
  titleTh: string;

  @IsOptional()
  @IsString()
  descriptionEn?: string;

  @IsOptional()
  @IsString()
  descriptionTh?: string;

  @IsOptional()
  @IsNumber()
  productId: number;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsInt()
  createdBy?: number;

  @IsOptional()
  @IsInt()
  updatedBy?: number;

  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => CreatePriceDto)
  prices: CreatePriceDto[];
}

export class PackageResponseDto {
  id: string;
  titleEn: string;
  titleTh: string;
  descriptionEn?: string;
  descriptionTh?: string;
  productId: string;
  createdAt: Date;
  updatedAt: Date;

  prices: PriceResponseDto[];
}
