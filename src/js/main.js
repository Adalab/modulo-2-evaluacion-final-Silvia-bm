"use strict";

console.log(">> Ready :)");




const list = document.querySelector(".list-element");
const cartList = document.querySelector(".cart-list");

const renderElements = (elements) => {
  list.innerHTML = "";

  //para cada elemento quiero que aparezca title, image, price, y tengo que crear cada elemento html
  elements.forEach((element) => {
    const item = document.createElement("li");

    item.innerHTML = `
      <div class="product-img"> <img src="${element.image}" alt="${element.title}"></div>
      <h3 class="product-title">${element.title}</h3>
      <p>${element.price} €</p>
      <button class="add-button">Comprar</button>
    `;

    const addButton = item.querySelector(".add-button"); // tengo que poner item en vez de document ya que lo he creado con item.innerHTML
    addButton.addEventListener("click", () => {
        const cartItem = item.cloneNode(true);
      cartItem.querySelector(".add-button").remove(); // quita el botón en el carrito
      cartList.appendChild(cartItem);
    });

list.appendChild(item);
  });
};

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    renderElements(data);
  });



