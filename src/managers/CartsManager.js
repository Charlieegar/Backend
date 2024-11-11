import { generateId } from "../utils/collectionHandler.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import paths from "../utils/paths.js";
import ErrorManager from "./ErrorManager.js";


export default class cartsManager {
    #jsonFileName;
    #carts;

    constructor() {
        this.#jsonFileName = "carts.json"

    }

    async $findOneById(id) {
        this.#carts = await this.getAll();
        const cartFound = this.#carts.find((item) => item.id === Number(id))

        if (!cartFound) {
            throw new ErrorManager ("Id no encontrado", 404)
        }
        return cartFound;
    }

    async getAll () {
        try {
            this.#carts = await readJsonFile(paths.files, this.#jsonFileName)
            return this.#carts
        }catch (error) {
            throw new ErrorManager(error.message, error.code)
        }
    }

    async getOneById (id) {
        try {
            const cartFound = await this.$findOneById(id);
            return cartFound;
        }catch (error) {
            throw new ErrorManager(error.message, error.code)
        }
    }

    async insertOne (data) {
        try {
            const products = data ?.products?.map(((item) => {
                return { product: Number(item.products), quantity: 1}
            }));

            const cart = {
                id: generateId(await this,this.getAll()),
                products: products || [],
            }
            this.#carts.push(cart);
            await writeJsonFile(paths.files, this.#jsonFileName, this.#carts)
            return cart;
        }catch (error) {
            throw new ErrorManager(error.message, error.code)
        }
    }

    addOneProduct = async (id, productId) => {
        try {
            const cartFound = await this.$findOneById(id);
            const productIndex = cartFound.products.findIndex((item) => item.product === Number(productId));

            if (productIndex >= 0) {
                cartFound.products[productIndex].quantity++;
            } else {
                cartFound.products.push({ product: Number(productId), quantity: 1 });
            }

            const index = this.#carts.findIndex((item) => item.id === Number(id));
            this.#carts[index] = cartFound;
            await writeJsonFile(paths.files, this.#jsonFileName, this.#carts);

            return cartFound;
        } catch (error) {
            throw new ErrorManager(error.message, error.code);
        }
    };


}