import * as mongoose from 'mongoose';

//we're making it injectable with the help of mongoose now we can inject it into files where we want to work with it
export const ProductSchema = new mongoose.Schema({
    title: {type: String, required: true},
    description: {type: String, required: true},
    price: {type: Number, required: true},
})



// has our own data description title and price but which also has all these mongoose magic methods and properties
//since we don't have constructor now so using interface which a type description
export interface Product extends mongoose.Document{ 
        id: string,
        title: string,
        description: string,
        price: number
}