import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) { }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findById(id: string): Promise<Product | null> {
        return this.productModel.findById(id).exec();
    }

    async create(product: Product): Promise<Product> {
        const newProduct = new this.productModel(product);
        return newProduct.save();
    }

    async update(id: string, productData: Partial<Product>): Promise<Product | null> {
        return this.productModel.findByIdAndUpdate(id, productData, { new: true }).exec();
    }

    async delete(id: string): Promise<Product | null> {
        return this.productModel.findByIdAndDelete(id).exec();
    }

}
