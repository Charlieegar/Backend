import { Router } from "express";

const router = Router();

router.get("/", async (req, res) => {
    try{
        res.status(200).render("home", {title: "Inicio"} );
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><p>${error.message}</p>`)
    }
});

router.get("/realTimeProducts",async (req, res) => {
    try{
        res.status(200).render("realTimeProducts", {title: "Tiempo Real"} );
    } catch (error) {
        res.status(500).send(`<h1>Error</h1><p>${error.message}</p>`)
    }
});


export default router;