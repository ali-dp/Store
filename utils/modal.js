const modal = document.getElementById("modal");
const textEle = modal.querySelector("p");
const modalButton = modal.querySelector("span");

const showModal = (type, text) => {
  switch (type) {
    case "correct":
      textEle.style.color = "#4ade80";
      modalButton.innerHTML = "<i class='fa-solid fa-circle-check'></i>";
      modalButton.style.backgroundColor = "#4ade80";
      break;
    case "incorrect":
      break;
    default:
  }
  textEle.innerText = text;
  modal.style.animation = "show-modal 2s";
  modal.style.display = "flex";
  setTimeout(() => closeModal(), 3000);
};

const closeModal = () => {
  modal.style.animation = "close-modal 2s";
  setTimeout(() => (modal.style.display = "none"), 500);
};

modalButton.addEventListener("click", closeModal);
export { showModal };
