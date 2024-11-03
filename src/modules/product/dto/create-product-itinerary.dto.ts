import { IsBoolean, IsOptional, IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateProductItineraryDto {
  @IsNotEmpty()
  @IsString()
  titleEn: string;

  @IsNotEmpty()
  @IsString()
  titleTh: string;

  @IsOptional()
  @IsString()
  subTitleEn?: string;

  @IsOptional()
  @IsString()
  subTitleTh?: string;

  @IsNotEmpty()
  @IsInt()
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
}

export class ProductItineraryResponseDto {
  id: number;
  titleEn: string;
  titleTh: string;
  subTitleEn?: string;
  subTitleTh?: string;
  productId: number;
  status?: boolean;
  createdAt: Date;
  updatedAt: Date;
}
