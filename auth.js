import { postData } from "./utils/httpReq.js";
import { setCookie } from "./utils/cookie.js";
import authHandler from "./utils/authorization.js";
import validateForm from "./utils/validation.js";
import { showModal } from "./utils/modal.js";

const inputBox = document.querySelectorAll("input");
const loginButton = document.querySelector("button");

const submitHandler = async (event) => {
  event.preventDefault();
  const username = inputBox[0].value;
  const password = inputBox[1].value;
  const validation = validateForm(username, password);
  if (!validation) return;
  const response = await postData("auth/login", { username, password });
  setCookie(response.token);
  showModal("correct","Login successfully");
  setTimeout(() => {
    location.assign("index.html");
  }, 1500);
};

loginButton.addEventListener("click", submitHandler);
document.addEventListener("DOMContentLoaded", authHandler);