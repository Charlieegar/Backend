const socket = io();

const mySocketId = document.getElementById("my-socket-id");
const text = document.getElementById("text");
const message = document.getElementById("message");

text.addEventListener("keyup", () => {
    socket.emit("newText", {text: text.value});

})

socket.on("message", (data) => {
    mySocketId.innerText = socket.id;

    message.innerHTML = "";

    data.forEach((item) => {
        message.innerHTML += `SocketId: ${item.socketId}, mensaje: ${item.message} `;
    });
    console.log(data);

});