import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './products/product.module';

@Module({
  imports: [
    MongooseModule.forRoot(`mongodb+srv://admin:bq6cz615za2uupb6@product-chase.ihtax.mongodb.net/product-chase`),
    ProductModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
