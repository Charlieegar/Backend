import { isValidID } from "../config/mongoose.config.js";
import ProductModel from "../models/product.model.js"
import ErrorManager from "./ErrorManager.js";
import { convertirABooleano } from "../utils/converter.js"


export default class productsManager {
    #ProductModel;

    constructor() {
        this.#ProductModel = ProductModel;

    }

    async $findOneById(id) {
        if (!isValidID(id)) {
            throw new ErrorManager ("Id invalido", 400)
        }
        const productFound = await this.#ProductModel.findById(id);

        if (!productFound) {
            throw new ErrorManager ("Id no encontrado", 404)
        }
        return productFound;
    }

    async getAll (params) {
        try {
            const $and = [];
            if (params?.title) $and.push({ title: { $regex: params.title, $options: "i" } });

            const filters = $and.length > 0 ? {$and} : {};
            const sort = {
                asc: {price: 1},
                desc: {price: -1},
            };
            const paginationOptions = {
                limit: params?.limit || 10,
                page: params?.page || 1,
                sort: sort[params?.sort] ?? {},
                lean: true,
            };

            return await this.#ProductModel.paginate(filters, paginationOptions);
        }catch (error) {
            throw ErrorManager.handleError(error);

        }
    }

    async getOneById (id) {
        try {
            const productFound = await this.$findOneById(id);
            return productFound;
        }catch (error) {
            throw ErrorManager.handleError(error);

        }
    }

    async insertOne (data) {
        try {
            const product = await this.#ProductModel.create({
                ...data,
                status: convertirABooleano(data.status),
            });
            return product;

        }catch (error) {
            throw ErrorManager.handleError(error);

        }
    }

    async actualizarOneById (id, data) {
        try {
            const productFound = await this.$findOneById(id);
            const newValues = {...productFound, ...data, status: data.status ? convertirABooleano(data.status) : productFound.status,};
            productFound.set(newValues);
            productFound.save();

            return productFound;
        }catch (error) {
            throw ErrorManager.handleError(error);

        }
    }

    async deleteOneById (id) {
        try {
            const productFound = await this.$findOneById(id);
            await productFound.deleteOne();

        }catch (error) {
            throw ErrorManager.handleError(error);
        }
    }



}