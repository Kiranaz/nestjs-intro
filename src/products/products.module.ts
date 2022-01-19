import { Module } from "@nestjs/common";

import {ProductsController} from './products.controller';
import {ProductsService} from './products.services';

@Module({
    providers: [ProductsService],
    controllers: [ProductsController]
})

export class ProductsModule {}