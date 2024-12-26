// @todo: Темплейт карточки
const cardTemplate = document.querySelector("#card-template").content;
const placeContainer = document.querySelector(".places__list");
// @todo: DOM узлы
const imgPopup = document.querySelector(".popup_type_image");
const editPopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
// @todo: вывод карточек
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");

// @todo: Функция создания карточки
function cardCreate(name, link) {
  const clonePattern = cardTemplate
    .querySelector(".places__item")
    .cloneNode(true);
  clonePattern.querySelector(".card__title").textContent = name;
  clonePattern.querySelector(".card__image").src = link;
  //Переключатель лайков
  const likeBtn = clonePattern.querySelector(".card__like-button");
  likeBtn.addEventListener("click", (event) => {
    likeBtn.classList.toggle("card__like-button_is-active");
  });

  // @todo: Функция удаления карточки
  const deleteBtn = clonePattern.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", (event) => {
    clonePattern.remove();
  });

  const imgCard = clonePattern.querySelector(".card__image");
  imgCard.addEventListener("click", (event) => {
    imgPopup.querySelector(".popup__caption").textContent = name;
    imgPopup.querySelector(".popup__image").src = link;
    const closeBtn = imgPopup.querySelector(".popup__close");
    closeBtn.addEventListener("click", (event) => {
      closePopup(imgPopup);
    });
    openPopup(imgPopup);
  });

  placeContainer.append(clonePattern);
  return clonePattern;
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => {
  cardCreate(card.name, card.link);
});

//Всплывающее окно
function openPopup(popup) {
  popup.classList.add("popup_is-animated");
  popup.querySelector(".popup__content").classList.add("popup_is-animated");
  popup.classList.add("popup_is-opened");
  popup.querySelector(".popup__content").classList.add("popup_is-opened");
}

profileEditButton.addEventListener("click", (event) => {
  openPopup(editPopup);
  const closeBtn = editPopup.querySelector(".popup__close");
  closeBtn.addEventListener("click", (event) => {
    closePopup(editPopup);
  });
});

profileAddButton.addEventListener("click", (event) => {
  openPopup(cardPopup);
  const closeBtn = cardPopup.querySelector(".popup__close");
  closeBtn.addEventListener("click", (event) => {
    closePopup(cardPopup);
  });
});

function closePopup(popup) {
  popup.classList.remove("popup_is-opened");
  popup.querySelector(".popup__content").classList.remove("popup_is-opened");
}
