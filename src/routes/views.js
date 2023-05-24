import { Router } from "express";
import ProductManager from "../Managers/ProductManager.js";

const ViewRouter = Router();

let manager = new ProductManager;

ViewRouter.get("/", async (req, res)=>{
    const products = await manager.getProducts()
    res.render("index", { products })
})

ViewRouter.get("/realtimeproducts", (req, res) => {
    res.render("realTimeProducts", {});
  });

export default ViewRouter;