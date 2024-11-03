import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { CreatePackageDto } from './dto/create-package.dto';
import { CreatePriceDto } from './dto/create-price.dto';
import { CreateProductItineraryDto } from './dto/create-product-itinerary.dto';
import { GoogleTokenGuard } from '../../guard/google-token.guard';
import { GoogleUserDecorator } from '../../decorators/google-user.decorator';
import { User } from '../../common/types/user';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @UseGuards(GoogleTokenGuard)
  createProduct(
    @Body() createProductDto: CreateProductDto,
    @GoogleUserDecorator() user: User,
  ) {
    this.productService.userId = user.id;
    return this.productService.createProduct(createProductDto);
  }

  @Get()
  @UseGuards(GoogleTokenGuard)
  findAllProducts(@GoogleUserDecorator() user: User) {
    console.log(user);
    this.productService.userId = user.id;
    return this.productService.findAll();
  }

  @Get(':id')
  findProductById(@Param('id') id: number) {
    return this.productService.findOne(id);
  }

  @Patch(':id')
  updateProduct(
    @Param('id') id: number,
    @Body() updateProductDto: CreateProductDto,
  ) {
    return this.productService.updateProduct(id, updateProductDto);
  }

  @Delete(':id')
  softDeleteProduct(@Param('id') id: number) {
    return this.productService.softDeleteProduct(id);
  }

  // Package Endpoints
  @Post(':productId/packages')
  createPackage(
    @Param('productId') productId: number,
    @Body() createPackageDto: CreatePackageDto,
  ) {
    return this.productService.createPackage(productId, createPackageDto);
  }

  @Patch('packages/:id')
  updatePackage(
    @Param('id') id: number,
    @Body() updatePackageDto: CreatePackageDto,
  ) {
    return this.productService.updatePackage(id, updatePackageDto);
  }

  @Delete('packages/:id')
  softDeletePackage(@Param('id') id: number) {
    return this.productService.softDeletePackage(id);
  }

  // Price Endpoints
  @Post('packages/:packageId/prices')
  createPrice(
    @Param('packageId') packageId: number,
    @Body() createPriceDto: CreatePriceDto,
  ) {
    return this.productService.createPrice(packageId, createPriceDto);
  }

  @Patch('prices/:id')
  updatePrice(@Param('id') id: number, @Body() updatePriceDto: CreatePriceDto) {
    return this.productService.updatePrice(id, updatePriceDto);
  }

  @Delete('prices/:id')
  softDeletePrice(@Param('id') id: number) {
    return this.productService.softDeletePrice(id);
  }

  // Product Itinerary Endpoints
  @Post(':productId/itineraries')
  createProductItinerary(
    @Body() createProductItineraryDto: CreateProductItineraryDto,
  ) {
    return this.productService.createProductItinerary(
      createProductItineraryDto,
    );
  }

  @Patch('itineraries/:id')
  updateProductItinerary(
    @Param('id') id: number,
    @Body() updateProductItineraryDto: CreateProductItineraryDto,
  ) {
    return this.productService.updateProductItinerary(
      id,
      updateProductItineraryDto,
    );
  }

  @Delete('itineraries/:id')
  softDeleteProductItinerary(@Param('id') id: number) {
    return this.productService.softDeleteProductItinerary(id);
  }
}
