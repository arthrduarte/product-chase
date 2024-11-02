import { ProductService } from './product.service';
import { Product } from './product.schema';
export declare class ProductController {
    private readonly productService;
    constructor(productService: ProductService);
    findAll(): Promise<Product[]>;
    findById(id: string): Promise<Product | null>;
    create(product: Product): Promise<Product>;
    update(id: string, productData: Partial<Product>): Promise<Product | null>;
    delete(id: string): Promise<Product | null>;
}
