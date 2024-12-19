import { connect, Types } from "mongoose";

export const connectDB = async () => {
    const URL = "mongodb+srv://charliegabrielgarcia14:12345@charlie.dre5h.mongodb.net/productos";
    try {
        await connect(URL);
        console.log("conectado a MongoDB")
    } catch (error) {
        console.log('Error al conectar con MongoDB', error.message);
    }
};

export const isValidID = (id) => {
    return Types.ObjectId.isValid(id);
};