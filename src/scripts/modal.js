export function openModal(popup) {
  popup.classList.add("popup_is-animated");
  popup.querySelector(".popup__content").classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  popup.querySelector(".popup__content").classList.add("popup_is-opened");
}

//закрытие окна
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  popup.querySelector(".popup__content").classList.remove("popup_is-opened");
}

const popups = document.querySelectorAll(".popup");

// Закрытие по клику на оверлей
popups.forEach((popup) => {
  popup.addEventListener("click", () => {
    closeModal(popup);
  });

  popup.querySelector(".popup__content").addEventListener("click", (event) => {
    event.stopPropagation();
  });

  popup.querySelector(".popup__close").addEventListener("click", () => {
    closeModal(popup);
  });
});

document.addEventListener("keydown", (event) => {
  if (event.code === "Escape") {
    popups.forEach((popup) => closeModal(popup));
  }
});
