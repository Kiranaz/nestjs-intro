import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";

import {ProductsController} from './products.controller';
import {ProductsService} from './products.services';
import { ProductSchema } from "./product.model";

@Module({
    imports: [MongooseModule.forFeature([{name: 'Product', schema: ProductSchema}])], //inject your model and then work with it
    providers: [ProductsService],
    controllers: [ProductsController]
})

export class ProductsModule {}