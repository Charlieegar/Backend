
import { Router } from "express";
import productsManager from "../managers/ProductsManager.js";

const router = Router();
const productManager = new productsManager();


router.get("/:pid", async (req, res) => {
    try {
        const product = await productManager.getOneById(req.params.id);
        res.status(200).render("product", {title: "Detalles de carrito", product})
    }catch (error) {
        res.status(error.code || 500).send(`<h1>Error</h1><h3>${error.message}</h3>`);
    }
});

export default router;