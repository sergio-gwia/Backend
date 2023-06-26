import { cartsModel } from "../models/Carts.model.js"

class cartManager {
  constructor() {
    this.model = cartsModel;
  }

  async createCarts() {
    try {
      const cart = {
        products: []
      };
      const newCart = await this.model.create(cart);
      return newCart;
    } catch (error) {
      console.log(error);
    }
  }

  async getCartsById(cid) {
    try {
      const cart = await this.model.findOne({ _id: cid }).populate("products.product");
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  async addProductToCart(cid, pid) {
    try {
      let cart = await cartsModel.findOne({ _id: cid });
      let existingProduct = cart.products.find((p) => p.product.id == pid);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.products.push({
          product: pid,
          quantity: 1
        });
      }
      await cart.save();
    } catch (error) {
      console.log(error);
    }
  }
  
  async deleteAllProducts(cid) {
    try {
      const cart = await cartsModel.findOneAndUpdate(
        { _id: cid },
        {$set: {products:[]}},
      );
  
      if (!cart) {
        throw new Error("Cart not found");
      }
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async deleteProduct(cid, pid) {
    try {
      const cart = await cartsModel.findOneAndUpdate(
        { _id: cid },
        { $pull: { products: { product: pid } } },
      );
      return cart;
    } catch (error) {
      console.log(error);
    }
  }

  async updateProductQuantity(cid, pid, quantity) {
    try {
      const cart = await cartsModel.findOneAndUpdate(
        { _id: cid, "products.product": pid },
        { $set: { "products.$.quantity": quantity } },
      )
      return cart;
    } catch (error) {
      console.log(error);
    }
  }
  

}

export default cartManager;
