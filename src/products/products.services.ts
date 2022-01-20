import { Injectable, NotFoundException } from "@nestjs/common";
import { Product } from "./product.model";
import { Model } from "mongoose";
import { InjectModel } from "@nestjs/mongoose";



@Injectable()
export class ProductsService {
    //private products: Product[] = [];
    //@InjectModel() //inject a mongoose model so that you can work with it
    //Model is of generic type, <Product> is its type now
    constructor(
        @InjectModel('Product') private readonly productModel: Model<Product>
    ) { }

    async insertProduct(title: string, desc: string, price: number) {
        const newProduct = new this.productModel({
            title,
            description: desc,
            price
        });
        const result = await newProduct.save();
        return result.id as string;
    }

    async getProducts() {
        const products = await this.productModel.find().exec();
        return products.map(prod => ({
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price,
        }))
    }

    async getSingleProduct(prodId: string) {
        const prod = await this.findProduct(prodId);
        return {
            id: prod.id,
            title: prod.title,
            description: prod.description,
            price: prod.price,
        }
    }

    async deleteProduct(prodId: string) {
        const result = await this.productModel.deleteOne({ _id: prodId }).exec();
        console.log(result,'i am result');
        if (!result) {
            throw new NotFoundException('Could not find product.');
        }
    }

    async updateProduct(productId: string, title: string, desc: string, price: number) {
        const updatedProduct = await this.findProduct(productId);
        if (title) {
            updatedProduct.title = title;
        }
        if (desc) {
            updatedProduct.description = desc;
        }
        if (price) {
            updatedProduct.price = price;
        }
        updatedProduct.save();
    }

    private async findProduct(id: string): Promise<Product> {
        let product;
        try {
            product = await this.productModel.findById(id).exec();
        } catch (error) {
            throw new NotFoundException('Could not find product.');
        }
        if (!product) {
            throw new NotFoundException('Could not find product.');
        }
        return product;
    }
}