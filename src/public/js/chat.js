const socket = io();

let mensaje = document.getElementById("mensaje")
let contenedor = document.getElementById("contenedor")
let user;

Swal.fire({
    title: "Bienvenido",
    input: 'text',
    text: "Ingresa tu Nombre:",
    inputValidator: (value)=>{
        return !value && "Necesitas ingresar un nombre"
    },
    allowOutsideClick: false
}).then(result => {
    user = result.value;
    return user;
}).then(user => socket.emit("newUserLoged", user))
.catch(error => console.log(error))

mensaje.addEventListener("keyup", evento => {
    if (evento.key == "Enter") {
        if (mensaje.value.trim().length > 0) {
            socket.emit("message", {user, message: mensaje.value})
            mensaje.value = ""
        }
    }
})

socket.on("allmessages", data => {
    contenedor.innerHTML = "";
  
    if (data.length > 0) {
      data.forEach(element => {
        let card = document.createElement("div");
        let usuario = document.createElement("p");
        let mensaje = document.createElement("p");
  
        usuario.innerText = element.user + " dice:";
        mensaje.innerText = element.message;

        card.classList.add("mt-3")
  
        card.appendChild(usuario);
        card.appendChild(mensaje);
  
        contenedor.appendChild(card);
      });
    }
  });
