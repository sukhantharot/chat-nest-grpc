import {
  IsBoolean,
  IsOptional,
  IsString,
  IsInt,
  IsNumber,
} from 'class-validator';

export class CreatePriceDto {
  @IsOptional()
  @IsNumber()
  id: number;

  @IsOptional()
  @IsString()
  titleEn: string;

  @IsOptional()
  @IsString()
  titleTh: string;

  @IsOptional()
  @IsNumber()
  saleAdultPrice?: number;

  @IsOptional()
  @IsNumber()
  saleChildPrice?: number;

  @IsOptional()
  @IsNumber()
  promotionAdultPrice?: number;

  @IsOptional()
  @IsNumber()
  promotionChildPrice?: number;

  @IsOptional()
  @IsNumber()
  packageId: number;

  @IsOptional()
  @IsBoolean()
  status?: boolean;

  @IsOptional()
  @IsInt()
  createdBy?: number;

  @IsOptional()
  @IsInt()
  updatedBy?: number;
}

export class PriceResponseDto {
  id: string;
  titleEn: string;
  titleTh: string;
  saleAdultPrice?: number;
  saleChildPrice?: number;
  promotionAdultPrice?: number;
  promotionChildPrice?: number;
  packageId: string;
  createdAt: Date;
  updatedAt: Date;
}
