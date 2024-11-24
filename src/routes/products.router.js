import {Router  } from "express";
import uploader from "../utils/uploader.js";
import ProductsManager from "../managers/ProductsManager.js"

const router = Router();
const productManager = new ProductsManager();

router.get("/", async (req, res) => {
    try {
        const products = await productManager.getAll();
        res.status(200).json({ status: "success", payload: products})
    }catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

router.get("/:pid", async (req, res) => {
    try {
        const product = await productManager.getOneById(req.params?.pid);
        res.status(200).json({ status: "success", payload: product})
    }catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

router.post("/", async (req, res) => {
    try {
        const product = await productManager.insertOne(req.body);
        res.status(201).json({ status: "success", payload: product})
    }catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

router.put("/:id", async (req, res) => {
    try {
        const product = await productManager.actualizarOneById(req.params?.pid, req.body);
        res.status(201).json({ status: "success", payload: product})
    }catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        await productManager.deleteOneById(req.params?.pid);
        res.status(201).json({ status: "success"})
    }catch (error) {
        res.status(error.code || 500).json({ status: "error", message: error.message });
    }
});

export default router;