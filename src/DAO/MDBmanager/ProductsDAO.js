import { Productsmodel } from "../models/Products.model.js";

class ProductManager {
    constructor(){
        this.model = Productsmodel;
    }

    async getProducts(){
        let products;
        try {
            products = await this.model.find()
        } catch (error) {
            console.log(error)
        }
        let productos = products.map(element =>{
            return {
                title: element.title,
                description: element.description,
                price: element.price,
                code: element.code,
                stock: element.stock,
                category: element.category
            }
        })
        return productos
    };

    async getProductsById(id){
        let product;
        try {
            product = this.model.findOne({_id: id})
        } catch (error) {
            console.log(error)
        }

        return product;
    };

    async addProduct(product){
        let createProduct;
        try {
            createProduct = await this.model.create(product)
        } catch (error) {
            console.log(error)
        }
        return createProduct;
    }

    async updateProduct(pid, product) {
        let producto;
        try {
            producto = await this.model.updateOne({_id: pid}, product)
        } catch (error) {
            console.log(error);
        }
        return producto;
    }

    async deleteProduct(pid){
        let product;
        try {
            product = this.model.deleteOne({_id: pid})
        } catch (error) {
            console.log(error)
        }

        return product;
    }
}

export default ProductManager;