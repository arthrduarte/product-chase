import { Controller, Get, Post, Body, Put, Delete, Param } from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.schema';

@Controller('products')
export class ProductController {
    constructor(private readonly productService: ProductService) { }

    @Get()
    findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get(':id')
    findById(@Param('id') id: string): Promise<Product | null> {
        return this.productService.findById(id);
    }

    @Post()
    create(@Body() product: Product): Promise<Product> {
        return this.productService.create(product);
    }

    @Put(':id')
    update(@Param('id') id: string, @Body() productData: Partial<Product>): Promise<Product | null> {
        return this.productService.update(id, productData);
    }

    @Delete(':id')
    delete(@Param('id') id: string): Promise<Product | null> {
        return this.productService.delete(id);
    }
}
