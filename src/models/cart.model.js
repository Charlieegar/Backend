import { Schema, model } from "mongoose";
import { paginate } from "mongoose-paginate-v2";

const cartSchema = new Schema({
    products: [
        {
            product: {
                type: Schema.Types.ObjectId,
                ref: "products",
                required: [true, "El nombre del producto es obligatorio"],
            },
            quantity: {
                type: Number,
                reuired: [ true, " La Cantidad de producto es oblogatoria"],
                min: [ 1, "La cantidad minima es 1"],
            },
            _id: false,
        },
    ],
}, {
    timestamps: true,
    versionKey: false,
});

cartSchema.plugin(paginate);
const CartModel = model("carts", cartSchema);
export default CartModel;