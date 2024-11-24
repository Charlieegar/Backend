
import express from "express"
import paths from "./utils/paths.js"
import {config as configHandlebars} from "./config/handlebars.config.js"
import { config as configWebsocket } from "./config/websocket.config.js"

import routerProducts from "./routes/products.router.js"
import routeCarts from "./routes/carts.router.js"
import routerViewProduct from "./routes/products.view.router.js";
import routerViewHome from "./routes/home.view.router.js"


const app = express();


const PORT = 8080;


app.use(express.urlencoded({ extended: true}));


app.use(express.json());


configHandlebars(app);


app.use("/api/public", express.static(paths.public))

app.use("/", routerViewHome);
app.use("/api/products", routerProducts);
app.use("/api/carts", routeCarts);
app.use("/products", routerViewProduct);


app.use("", (req, res) => {
    res.status(404).render("error404", {title: "Error 404"} )
});

const httpServer = app.listen(PORT, () => {
    console.log(`Ejecutandose en http://localhost:${PORT}`);
});

configWebsocket(httpServer);