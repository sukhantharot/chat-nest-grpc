import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePackageDto } from './dto/create-package.dto';
import { CreatePriceDto } from './dto/create-price.dto';
import { CreateProductItineraryDto } from './dto/create-product-itinerary.dto';

@Injectable()
export class ProductService {
  get userId(): number {
    return this._userId;
  }

  set userId(value: number) {
    this._userId = value;
  }
  private _userId: number;
  constructor(private prisma: PrismaService) {}
  async createProduct(createProductDto: CreateProductDto) {
    return this.prisma.product.create({
      data: {
        ...createProductDto,
        createdBy: this.userId,
        productItinerary: {
          create: {
            ...createProductDto.productItinerary,
          },
        },
      },
    });
  }

  async createPackage(productId: number, createPackageDto: CreatePackageDto) {
    return this.prisma.package.create({
      data: {
        titleEn: createPackageDto.titleEn,
        titleTh: createPackageDto.titleTh,
        descriptionEn: createPackageDto.descriptionEn,
        descriptionTh: createPackageDto.descriptionTh,
        status: createPackageDto.status,
        createdBy: createPackageDto.createdBy,
        updatedBy: createPackageDto.updatedBy,
        product: {
          connect: { id: productId },
        },
        prices: {
          create: createPackageDto.prices,
        },
      },
    });
  }

  async createPrice(packageId: number, createPriceDto: CreatePriceDto) {
    return this.prisma.price.create({
      data: {
        ...createPriceDto,
        packageId,
      },
    });
  }

  async findAll() {
    return this.prisma.product.findMany({
      where: { status: true, deletedAt: null },
      include: {
        packages: {
          include: { prices: true },
        },
      },
    });
  }

  async findOne(id: number) {
    return this.prisma.product.findUnique({
      where: { id },
      include: {
        packages: {
          include: { prices: true },
        },
      },
    });
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const { productItinerary, ...otherFields } = updateProductDto;

    return this.prisma.product.update({
      where: { id },
      data: {
        ...otherFields,
        ...(productItinerary && {
          productItinerary: {
            deleteMany: {},
            create: productItinerary,
          },
        }),
      },
    });
  }

  async updatePackage(id: number, updatePackageDto: CreatePackageDto) {
    const { prices, ...otherFields } = updatePackageDto;

    return this.prisma.package.update({
      where: { id },
      data: {
        ...otherFields,
        ...(prices && {
          prices: {
            upsert: prices.map((price) => ({
              where: { id: price.id || 0 }, // Assuming `id` is provided for existing prices
              create: { ...price },
              update: { ...price },
            })),
          },
        }),
      },
    });
  }

  async updatePrice(id: number, updatePriceDto: CreatePriceDto) {
    return this.prisma.price.update({
      where: { id },
      data: updatePriceDto,
    });
  }

  async softDeleteProduct(id: number) {
    return this.prisma.product.update({
      where: { id },
      data: {
        status: false,
        deletedAt: new Date(),
      },
    });
  }

  async softDeletePackage(id: number) {
    return this.prisma.package.update({
      where: { id },
      data: {
        status: false,
        deletedAt: new Date(),
      },
    });
  }

  async softDeletePrice(id: number) {
    return this.prisma.price.update({
      where: { id },
      data: {
        status: false,
        deletedAt: new Date(),
      },
    });
  }

  async createProductItinerary(
    createProductItineraryDto: CreateProductItineraryDto,
  ) {
    return this.prisma.productItinerary.create({
      data: {
        ...createProductItineraryDto,
      },
    });
  }

  // Update a product itinerary by ID
  async updateProductItinerary(
    id: number,
    updateProductItineraryDto: CreateProductItineraryDto,
  ) {
    return this.prisma.productItinerary.update({
      where: { id },
      data: updateProductItineraryDto,
    });
  }

  // Soft delete a product itinerary by ID
  async softDeleteProductItinerary(id: number) {
    return this.prisma.productItinerary.update({
      where: { id },
      data: {
        status: false,
        deletedAt: new Date(),
      },
    });
  }
}
