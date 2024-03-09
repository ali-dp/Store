import { getCookie } from "./utils/cookie.js";
import { getData } from "./utils/httpReq.js";
import { shortenText } from "./utils/stringFunc.js";

const loginButton = document.getElementById("login");
const dashboardButton = document.getElementById("dashboard");
const mainContent = document.getElementById("products");
const searchButton = document.querySelector("button");
const inputBox = document.querySelector("input");
const listItems = document.querySelectorAll("li");

let allProducts = null;

const showProducts = (products) => {
  mainContent.innerHTML = "";
  products.forEach((product) => {
    const JSX = `
      <div>
        <img alt="${product.title}" src="${product.image}" />
        <h4>${shortenText(product.title)}</h4>
        <div id="price">
            <p>$ ${product.price}</p>
            <button>Buy <i class="fa-solid fa-cart-shopping"></i>
      </div>
      <div id="rate">
            <i class="fa-solid fa-star"></i>
            <span>${product.rating.rate}</span>
      </div>
      <div id="count">
            <i class="fa-solid fa-user"></i>
            <span>${product.rating.count}</span>
      </div>
      `;
    mainContent.innerHTML += JSX;
  });
};

const init = async () => {
  const cookie = getCookie();
  if (cookie) {
    loginButton.style.display = "none";
  } else dashboardButton.style.display = "none";

  allProducts = await getData("products");
  showProducts(allProducts);
};

const searchHandler = (product) => {
  const query = inputBox.value.trim().toLocaleLowerCase();
  if (!query) return showProducts(allProducts);
  const filteredProducts = allProducts.filter((product) =>
    product.title.toLocaleLowerCase().includes(query)
  );
  showProducts(filteredProducts);
};

const filterHandler = (event) => {
  const category = event.target.innerText.toLocaleLowerCase();
  listItems.forEach((li) => {
    if (li.innerText.toLocaleLowerCase() === category) {
      li.className = "selected";
    } else {
      li.className = "";
    }
});


if (category === "all") return showProducts(allProducts);

  const filteredProducts = allProducts.filter(
    (product) => product.category.toLocaleLowerCase() == category
  );
  showProducts(filteredProducts);
};

document.addEventListener("DOMContentLoaded", init);
searchButton.addEventListener("click", searchHandler);
listItems.forEach((li) => li.addEventListener("click", filterHandler));
