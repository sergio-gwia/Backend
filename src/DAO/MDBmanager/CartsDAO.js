import { cartsModel } from "../models/Carts.model.js"

class cartManager {
    constructor(){
        this.model = cartsModel;
    }

    async createCarts(){
        let newCart;
        let cart = {
            products: []
        }
        try {
           newCart = await this.model.create(cart) 
        } catch (error) {
            console.log(error);
        }
        return newCart;
    }

    async getCartsById(cid){
        let cart;
        try {
            cart = await this.model.findOne({_id: cid})
        } catch (error) {
            console.log(error);
        }

        return cart;
    }

    async addProductToCart(cid, pid){
        let cart;
        let carrito;
        let product = {
            id: pid,
            quantity: 1
        }
        try {
            cart = await this.model.findOne({_id: cid})
            let newCart = cart.products.find(elem => elem = pid)
            if (newCart) {
                newCart.quantity++
                carrito = await this.model.updateOne({_id: cid}, {products: newCart})
            }else{
                carrito = await this.model.updateOne({_id: cid}, {$push: {products: product}})  
            } 
        } catch (error) {
            console.log(error);
        }
        
    }
}

export default cartManager;