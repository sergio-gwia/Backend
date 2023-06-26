import { Router } from "express";
import ProductManager from "../DAO/MDBmanager/ProductsDAO.js";
import cartManager from "../DAO/MDBmanager/CartsDAO.js";

const ViewRouter = Router();

let manager = new ProductManager;
let CartManager = new cartManager

ViewRouter.get("/", async (req, res)=>{
  let limit = req.query.limit
  let page = req.query.page
  let sort = req.query.sort
  let category = req.query.category
  let products = []
  let Newpage;
   let data = await manager.getProducts(limit,page,sort,category)
    let productos = data.products.map(element =>{
            return {
                title: element.title,
                description: element.description,
                price: element.price,
                code: element.code,
                stock: element.stock,
                category: element.category,
            }
        })
        Newpage = data.page 
    res.render("products", { productos, Newpage, style:"style.css" })
})

ViewRouter.get("/carts/:cid", async (req, res) => {
  let cid = req.params.cid
  let data = await CartManager.getCartsById(cid)
  let productos = data.products.map(element =>{
    return {
      title: element.product.title,
      description: element.product.description,
      price: element.product.price,
      code: element.product.code,
      stock: element.product.stock,
      category: element.product.category,
      cantidad: element.quantity
  }
})
  res.render("cart", {productos, style:"style.css"});
});

ViewRouter.get("/realtimeProducts", (req, res) => {
    res.render("realTimeProducts", {style:"style.css"});
  });

  ViewRouter.get("/chat", (req, res) => {
    res.render("chat", {style:"style.css"});
  });

export default ViewRouter;