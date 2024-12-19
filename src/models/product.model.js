import { Schema, model } from "mongoose";
import { paginate } from "mongoose-paginate-v2";

const productSchema = new Schema ({
    title: {
        index: { name: "idx_title"},
        type: String,
        required: [true, "El nombre es obligatorio"],
        uppercase: true,
        trim: true,
        minLength: [2, "El nombre debe de tener al menos 2 caracteres"],
        maxLength: [20, "El nombre debe de tener un maximo de 20 caracteres"]
        },
    status: {
        type: Boolean,
        required: [ true, "El estado es obligatorio" ],
    },
    stock: {
        type: Number,
        required: [ true, "El stock es obligatorio" ],
        min: [ 0, "El stock debe ser un valor positivo" ],
    },

}, {
    timestamps: true,
    versionKey: false,
});

productSchema.plugin(paginate);

const ProductModel = model("products", productSchema);
export default ProductModel;