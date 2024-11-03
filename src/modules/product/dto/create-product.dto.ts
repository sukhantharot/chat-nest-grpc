import {
  IsBoolean,
  IsOptional,
  IsString,
  IsNotEmpty,
  IsInt,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreateProductItineraryDto } from './create-product-itinerary.dto';

export class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  nameEn: string;

  @IsNotEmpty()
  @IsString()
  nameTh: string;

  @IsOptional()
  @IsString()
  descriptionEn?: string;

  @IsOptional()
  @IsString()
  descriptionTh?: string;

  @IsOptional()
  @IsString()
  itineraryEn?: string;

  @IsOptional()
  @IsString()
  itineraryTh?: string;

  @IsOptional()
  @IsString()
  conditionsEn?: string;

  @IsOptional()
  @IsString()
  conditionsTh?: string;

  @IsOptional()
  @IsString()
  remarksEn?: string;

  @IsOptional()
  @IsString()
  remarksTh?: string;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsInt()
  createdBy?: number;

  @IsOptional()
  @IsInt()
  updatedBy?: number;

  @ValidateNested({ each: true })
  @Type(() => CreateProductItineraryDto)
  productItinerary: CreateProductItineraryDto[];
}

export class ProductResponseDto {
  id: string;
  nameEn: string;
  nameTh: string;
  descriptionEn?: string;
  descriptionTh?: string;
  itineraryEn?: string;
  itineraryTh?: string;
  conditionsEn?: string;
  conditionsTh?: string;
  remarksEn?: string;
  remarksTh?: string;
  createdAt: Date;
  updatedAt: Date;
}
