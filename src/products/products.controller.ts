import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./products.services";


@Controller('products')
export class ProductsController {
    constructor(private readonly productServices: ProductsService){}
    
    @Post()
    async addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
        const generatedId = await this.productServices.insertProduct(prodTitle, prodDesc, prodPrice);
        return {id: generatedId};
    }

    @Get()
    async getAllProducts(){
        return await this.productServices.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string){
        return this.productServices.getSingleProduct(prodId);
    }

    @Patch(':id')
    async updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ){
        await this.productServices.updateProduct(prodId, prodTitle, prodDesc, prodPrice)
        return null;
    }

    @Delete(':id')
    async removeProduct(@Param('id') prodId: string){
        await this.productServices.deleteProduct(prodId);
        return null;
    }


}