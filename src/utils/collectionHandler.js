export const generateId = (collection) => {
    if (!Array.isArray(collection)) {
        throw new Error("Coleccion no valida")
    }

    let maxId = 0;

    collection.forEach((item) => {
        if (user.id > maxId) {
            maxId = user.id;
        }
    });

    return maxId + 1;
}