
const socket = io()

const title = document.getElementById("title");
const description = document.getElementById("description");
const code = document.getElementById("code");
const price = document.getElementById("price");
const stock = document.getElementById("stock");
const btnAgregar = document.getElementById("btnAgregar");

const socketId = document.getElementById("socketId") 
const btnEliminar = document.getElementById("btnEliminar")

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
    data.forEach(product => {
        let card = document.createElement("div")
        let cardTitle = document.createElement("h2")
        let cardDescription = document.createElement("p")
        let cardPrice = document.createElement("p")
        let cardCode = document.createElement("p")
        let cardStock = document.createElement("p")

        cardTitle.innerText = product.title
        cardDescription.innerText = product.description
        cardPrice.innerText = "Precio: $" + product.price
        cardCode.innerText = "Codigo: " + product.code
        cardStock.innerText = "Stock: " + product.stock

        card.classList.add("card", "border", "border-3", "cardRealTime", "text-center");
        cardTitle.classList.add("card-title");
        cardDescription.classList.add("card-text", "fs-6", "fw-bold");
        cardPrice.classList.add("card-text", "fs-6", "fw-bold");
        cardCode.classList.add("card-text", "fs-6", "fw-bold");
        cardStock.classList.add("card-text", "fs-6", "fw-bold");

        card.appendChild(cardTitle);
        card.appendChild(cardDescription);
        card.appendChild(cardPrice);
        card.appendChild(cardCode);
        card.appendChild(cardStock);

        productos.appendChild(card);
    });
  })

  btnEliminar.addEventListener("click", ()=>{
    let id = socketId.value;
    socket.emit("deleted-product", id)
  })