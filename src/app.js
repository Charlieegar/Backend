//BORRAR LOS COMENTARIOS ANTES DE ENVIAR
import express from "express"
// import paths from "./utils/paths.js"
import { connectDB } from "./config/mongoose.config.js"
import {config as configHandlebars} from "./config/handlebars.config.js"
import { config as configWebsocket } from "./config/websocket.config.js"

//Importacion de enrutadores
import routerProducts from "./routes/products.router.js"
import routeCarts from "./routes/carts.router.js"
import routerViewProduct from "./routes/products.view.router.js";
import routerViewHome from "./routes/home.view.router.js"

//Creo una instancia de la aplicacion Express
const app = express();

//Conexion con la BD de Mongo
connectDB();

//Defino el puerto en el que el servidor escuchara las solicitudes
const PORT = 8080;

//Middleware para acceder al contenido de formularios codificados en URL
app.use(express.urlencoded({ extended: true}));

//Middleware para acceder al contenido JSON de las solicitudes
app.use(express.json());

//Motor de plantillas
configHandlebars(app);

//Declaracion de rutas
// app.use("/api/public", express.static(paths.public))
app.use("/api/public", express.static( "./src/public"));

app.use("/", routerViewHome);
app.use("/api/products", routerProducts);
app.use("/api/carts", routeCarts);
app.use("/products", routerViewProduct);

//Control de rutas inexistentes
app.use("", (req, res) => {
    res.status(404).render("error404", {title: "Error 404"} )
});

const httpServer = app.listen(PORT, () => {
    console.log(`Ejecutandose en http://localhost:${PORT}`);
});

configWebsocket(httpServer);