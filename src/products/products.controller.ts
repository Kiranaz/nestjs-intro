import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ProductsService } from "./products.services";


@Controller('products')
export class ProductsController {
    constructor(private readonly productServices: ProductsService){}
    
    @Post()
    addProduct(
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ) {
        const generatedId = this.productServices.insertProduct(prodTitle, prodDesc, prodPrice);
        return {id: generatedId};
    }

    @Get()
    getAllProducts(){
        return this.productServices.getProducts();
    }

    @Get(':id')
    getProduct(@Param('id') prodId: string){
        return this.productServices.getSingleProduct(prodId);
    }

    @Patch(':id')
    updateProduct(
        @Param('id') prodId: string,
        @Body('title') prodTitle: string,
        @Body('description') prodDesc: string,
        @Body('price') prodPrice: number
    ){
        this.productServices.updateProduct(prodId, prodTitle, prodDesc, prodPrice)
        return null;
    }

    @Delete(':id')
    removeProduct(@Param('id') prodId: string){
        this.productServices.deleteProduct(prodId);
        return null;
    }


}