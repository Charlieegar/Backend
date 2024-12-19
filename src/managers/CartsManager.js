import ErrorManager from "./ErrorManager.js";
import { isValidID } from "../config/mongoose.config.js";
import CartModel from "../models/cart.model.js";



export default class cartsManager {
    #cartModel;

    constructor() {
        this.#cartModel= CartModel;

    }

    async $findOneById(id) {
        if (!isValidID(id)) {
            throw new ErrorManager ("Id no encontrado", 400)
        }
        const cartFound = await this.#cartModel.findById(id).populate("products.product")
        if (!cartFound){
            throw new ErrorManager("Id no ecnontrado", 404);
        }
        return cartFound;
    }

    async getAll(params) {
        try {
            const paginateOptions = {
                limit: params?.limit || 10,
                populate: "products.product",
                lean: true,
            };
            return await this.#cartModel.paginate({}, paginateOptions);
        } catch (error) {
            throw ErrorManager.handleError(error);
        }
    }



    async getOneById (id) {
        try {
            const cartFound = await this.$findOneById(id);
            return cartFound;
        }catch (error) {
            throw  ErrorManager.handleError(error);
        }
    }

    async insertOne(data) {
        try {
            const cart = await this.#cartModel.create(data);
            return cart;
        } catch (error) {
            throw  ErrorManager.handleError(error);
        }
    }


    addOneProduct = async (id, productId) => {
        try {
            const cartFound = await this.$findOneById(id);
            const productIndex = cartFound.products.findIndex((item) => item.product._id.toString() === productId);

            if (productIndex >= 0) {
                cartFound.products[productIndex].quantity++;
            } else {
                cartFound.products.push({ product: productId, quantity: 1 });
            }
            await cartFound.save();
            return cartFound;
        } catch (error) {
            throw  ErrorManager(error.message, error.code);
        }
    };


}