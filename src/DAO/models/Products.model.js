import mongoose from "mongoose";
import paginate from "mongoose-paginate-v2"
 const productsCollection = "products";

 const productSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    }
 });

 productSchema.plugin(paginate);
 export const Productsmodel = mongoose.model(productsCollection, productSchema);