import { generateId } from "../utils/collectionHandler.js";
import { convertirABooleano } from "../utils/converter.js";
import { readJsonFile, writeJsonFile } from "../utils/fileHandler.js";
import paths from "../utils/paths.js";
import ErrorManager from "./ErrorManager.js";


export default class productsManager {
    #jsonFileName;
    #products;

    constructor() {
        this.#jsonFileName = "products.json"

    }

    async $findOneById(id) {
        this.#products = await this.getAll();
        const productFound = this.#products.find((item) => item.id === Number(id))

        if (!productFound) {
            throw new ErrorManager ("Id no encontrado", 404)
        }
        return productFound;
    }

    async getAll () {
        try {
            this.#products = await readJsonFile(paths.files, this.#jsonFileName)
            return this.#products
        }catch (error) {
            throw new ErrorManager(error.message, error.code)
        }
    }

    async getOneById (id) {
        try {
            const productFound = await this.$findOneById(id);
            return productFound;
        }catch (error) {
            throw new ErrorManager(error.message, error.code)
        }
    }

    async insertOne (data) {
        try {
            const { title, status, stock, description, category, price} = data;
            if (!title || !status ||!stock || !description || !category || !price) {
                throw new ErrorManager("Faltan datos obligatorios", 400)
            }
            const product = {
                id: generateId(await this.getAll()),
                title,
                description,
                category,
                price,
                status,
                stock

            }
            this.#products.push(product);
            await writeJsonFile(paths.files, this.#jsonFileName, this.#products)
            return product;
        }catch (error) {
            throw new ErrorManager(error.message, error.code)
        }
    }

    async actualizarOneById (id, data) {
        try {
            const { title, status, stock, description, category, price} = data;
            const productFound = await this.$findOneById(id);

            const product = {
                id: productFound.id,
                title: title ? title : productFound.title,
                description: description ? description : productFound.description,
                category: category ? category : productFound.category,
                price: price ? Number(price) : productFound.price,
                status: status ? convertirABooleano(status) : productFound.status,
                stock: stock ? Number(stock) : productFound.stock
            }
            const index = this.#products.findIndex((item) => item.id === Number(id))
            this.#products[index] = product;
            await writeJsonFile(paths.files, this.#jsonFileName, this.#products)

            return product;
        }catch (error) {
            throw new ErrorManager(error.message, error.code)
        }
    }

    async deleteOneById (id) {
        try {
            await this.$findOneById(id);

            const index = this.#products.findIndex((item) => item.id === Number(id))
            this.#products.splice(index, 1);
            await writeJsonFile(paths.files, this.#jsonFileName, this.#products)

        }catch (error) {
            throw new ErrorManager(error.message, error.code)
        }
    }



}