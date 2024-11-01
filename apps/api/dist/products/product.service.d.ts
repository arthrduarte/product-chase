import { Model } from 'mongoose';
import { Product } from './product.schema';
export declare class ProductService {
    private productModel;
    constructor(productModel: Model<Product>);
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    create(product: Product): Promise<Product>;
    update(id: string, productData: Partial<Product>): Promise<Product | null>;
    delete(id: string): Promise<Product | null>;
}