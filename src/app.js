import express from "express"
import paths from "./utils/paths.js"

import routerProducts from "./routes/products.router.js"
import routeCarts from "./routes/carts.router.js"

//Creo una instancia de la aplicacion Express
const app = express();

//Defino el puerto en el que el servidor escuchara las solicitudes
const PORT = 8080;

//Middleware para acceder al contenido de formularios codificados en URL
app.use(express.urlencoded({ extended: true}));

//Middleware para acceder al contenido JSON de las solicitudes
app.use(express.json());

app.use("/api/public", express.static(paths.public))

app.use("/api/products", routerProducts);
app.use("/api/carts", routeCarts);

app.listen(PORT, () => {
    console.log(`Ejecutandose en http://localhost:${PORT}`);
})