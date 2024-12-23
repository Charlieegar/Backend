const socket = io();

const productsList = document.getElementById("products-list");
const productsForm = document.getElementById("products-form");
const inputProductId = document.getElementById("input-product-id");
const btnDeleteProduct = document.getElementById("btn-delete-product");
const errorMessage = document.getElementById("error-message");


socket.on("products-list", (data) => {
    const products = data.products.docs ?? [];

    productsList.innerText = "";

    products.forEach((product) => {
        productsList.innerHTML += `<li> Id: ${product.id} - Nombre: ${product.title}</li>`
    });

});

productsForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);

    errorMessage.innerText = "";
    form.reset();

    socket.emit("add-product", {
        title: formData.get("title"),
        status: formData.get("status") || "off",
        stock: formData.get("stock"),
    });
});

btnDeleteProduct.addEventListener("click", () => {
    const id = inputProductId.value;
    inputProductId.innerText ="";
    errorMessage.innerText = "";

    if (id > 0) {
        socket.emit("delete-product", {id});
    }
});

socket.on("error-message", (data) => {
    errorMessage.innerText = data.message
})

