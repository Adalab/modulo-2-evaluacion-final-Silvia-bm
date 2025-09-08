"use strict";

console.log(">> Ready :)");

const list = document.querySelector(".list-element");
const cartList = document.querySelector(".cart-list");
const removeButton = document.querySelector(".button-remove");
const searchInput = document.querySelector(".search-input");
const searchButton = document.querySelector(".search-button");

let elements = []; // variable para todos los productos
let cart = []; // Variable para productos del carrito

const saveCart = () => {
  localStorage.setItem("cart", JSON.stringify(cart));
};

const loadCart = () => {
  const savedCart = localStorage.getItem("cart");
  if (savedCart) {
    cart = JSON.parse(savedCart);
    renderCart();
  }
};

const renderElements = (items) => {
  list.innerHTML = "";

  items.forEach((itemData) => {
    const item = document.createElement("li");

    const button = document.createElement("button");
    button.dataset.id = itemData.id;

    const isInCart = cart.some((item) => item.id === itemData.id);
    if (isInCart) {
      button.textContent = "Remove";
      button.classList.add("add-button--red");
    } else {
      button.textContent = "Add";
      button.classList.add("add-button");
    }

    item.innerHTML = `
      <div class="product-img"><img src="${itemData.image}" alt="${itemData.title}"></div>
      <h3 class="product-title">${itemData.title}</h3>
      <p>${itemData.price} €</p>
    `;
    item.appendChild(button);

    button.addEventListener("click", () => {
      const id = parseInt(button.dataset.id);
      const product = elements.find((item) => item.id === id);
      const isInCart = cart.some((item) => item.id === id);

      if (!isInCart) {
        cart.push(product);
        button.textContent = "Remove";
        button.classList.remove("add-button");
        button.classList.add("add-button--red");
      } else {
        cart = cart.filter((item) => item.id !== id);
        button.textContent = "Add";
        button.classList.remove("add-button--red");
        button.classList.add("add-button");
      }

      renderCart();
      saveCart();
    });

    list.appendChild(item);
  });
};

// Rederizar el carrito
const renderCart = () => {
  cartList.innerHTML = "";

  cart.forEach((product) => {
    const item = document.createElement("li");
    item.innerHTML = `
      <div class="product-img"><img src="${product.image}" alt="${product.title}"></div>
      <h3 class="product-title">${product.title}</h3>
      <p>${product.price} €</p>
    `;
    cartList.appendChild(item);
  });
};

const handleClickRemove = () => {
  cart = [];
  renderCart();
  saveCart();

  document.querySelectorAll(".add-button, .add-button--red").forEach((btn) => {
    // tengo que poner esto porque al haber cambiado la clase del botón para cambiarle los colores no puedo poner solo .add-button
    btn.textContent = "Add";
    btn.classList.remove("add-button--red");
    btn.classList.add("add-button");
  });
};

removeButton.addEventListener("click", handleClickRemove); // esto ejecuta lo de arriba que hace que la lista del carrito se vacía cuando escucha el click

const handleClickSearch = () => {
  const searchInputValue = searchInput.value.toLowerCase();
  const productsFilter = elements.filter((product) =>
    product.title.toLowerCase().includes(searchInputValue)
  );
  renderElements(productsFilter);
};

searchButton.addEventListener("click", handleClickSearch);

fetch("https://fakestoreapi.com/products")
  .then((response) => response.json())
  .then((data) => {
    elements = data;
    loadCart();
    renderElements(elements);
  });
