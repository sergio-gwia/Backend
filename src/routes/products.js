import { Router } from "express";
import ProductManager from "../DAO/MDBmanager/ProductsDAO.js";
const ProductsRouter = Router();

let manager = new ProductManager;

ProductsRouter.get("/", async(req, res)=>{
    let products;
    try {
        products = await manager.getProducts()
    } catch (error) {
        res.status(400).send({status: "error", error})
    }
    res.send({status: "success", payload: products})
});

ProductsRouter.get("/:pid", async (req, res)=>{
    let pid = req.params.pid;
    let product;
    try {
        product = await manager.getProductsById(pid)
    } catch (error) {
        res.status(400).send({status: "error", error})
    }
    res.send({status: "success", payload: product})
});

ProductsRouter.post("/", async (req, res)=>{
    let product = req.body;
    if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
        return  res.status(400).send({status: "error", error})
    }
    try {
        await manager.addProduct(product)
    } catch (error) {
        res.status(400).send({status: "error", error})
    }
    res.send({status: "success", msg: "Product Created!"})
});

ProductsRouter.put("/:pid", async (req, res) => {
    let pid = req.params.pid;
    let product = req.body;
    if (!product.title || !product.description || !product.code || !product.price || !product.stock || !product.category) {
        return  res.status(400).send({status: "error", error})
    }
    try {
        await manager.updateProduct(pid, product)
    } catch (error) {
        res.status(400).send({status: "error", error})
    }
    res.send({status: "success", msg: "Product Updated!"})
});

ProductsRouter.delete("/:pid", async(req, res)=>{
    let pid = req.params.pid;
    let productDelete; 
    try {
        productDelete = await manager.deleteProduct(pid);
    } catch (error) {
        res.status(400).send({ status: "error", msg: "Product cannot be deleted!" })
    }
    res.send({ status: "success", msg: "Product deleted"})
})
export default ProductsRouter;