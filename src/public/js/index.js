
const socket = io()

const title = document.getElementById("title");
const description = document.getElementById("description");
const code = document.getElementById("code");
const price = document.getElementById("price");
const stock = document.getElementById("stock");
const btnAgregar = document.getElementById("btnAgregar");

btnAgregar.addEventListener("click", () => {
    let product = {
      title: title.value,
      description: description.value,
      price: price.value,
      code: code.value,
      stock: stock.value,
    };
    socket.emit("createProduct", product);
  });

  socket.on("resp-new-product", (data)=>{
    let productos = document.getElementById("productos")
    data.forEach(element => {
        let parrafo = document.createElement("p")
        parrafo.innerText = element.title
        productos.appendChild(parrafo)
    });
  })