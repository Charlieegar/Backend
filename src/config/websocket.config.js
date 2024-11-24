import { Server} from "socket.io";
import ProductsManager from "../managers/ProductsManager.js"

const productsManager = new ProductsManager();

export const config = (httpServer) => {
    //Crea una nueva instancia del servidor Socket.io
    const socketServer = new Server(httpServer);

    socketServer.on("connection" , async (socket) => {
        socketServer.emit("products-list", { products: await productsManager.getAll()});

        socket.on("add-product", async (data) => {
            try {
                await productsManager.insertOne(data);
                socketServer.emit("products-list", { products: await productsManager.getAll()});
            }catch(error) {
                socketServer.emit("error-message", { message: error.message});
            }
        });

        socket.on("delete-product", async (data) => {
            try {
                await productsManager.deleteOneById(data.id);
                socketServer.emit("products-list", { products: await productsManager.getAll()});
            }catch(error) {
                socketServer.emit("error-message", { message: error.message});
            }
        });
    });

};