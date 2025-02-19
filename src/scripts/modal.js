export function openModal(popup) {
  popup.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleEscClose);
}

//закрытие окна
export function closeModal(popup) {
  popup.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleEscClose);
}

function handleEscClose(event) {
  if (event.code === "Escape") {
    const popup = document.querySelector(".popup_is-opened");
    closeModal(popup);
  }
}

export function initPopups() {
  const popups = document.querySelectorAll(".popup");

  // Закрытие по клику на оверлей
  popups.forEach((popup) => {
    popup.classList.add("popup_is-animated");

    popup.addEventListener("mousedown", (event) => {
      if (event.target.classList.contains("popup")) {
        closeModal(popup);
      }
    });

    popup.querySelector(".popup__close").addEventListener("click", () => {
      closeModal(popup);
    });
  });
}

export function setLoadingState(form) {
  const submitButton = form.querySelector("button");
  submitButton.classList.add("popup__button_disabled");
  submitButton.textContent = "Сохранение...";
}

export function unSetLoadingState(form) {
  const submitButton = form.querySelector("button");
  submitButton.classList.remove("popup__button_disabled");
  submitButton.textContent = "Сохранить";
}
