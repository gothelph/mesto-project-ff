import { initialCards, cardCreate } from "./cards";
import { openModal, closeModal } from "./modal";

// @todo: Темплейт карточки
const placeContainer = document.querySelector(".places__list");
// @todo: DOM узлы
const editPopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
// @todo: вывод карточек
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
//@todo submit
const editProfileFormElement = editPopup.querySelector(".popup__form");
const addCardFormElement = cardPopup.querySelector(".popup__form");
const nameInput = editProfileFormElement.querySelector(
  ".popup__input_type_name"
);
const jobInput = editProfileFormElement.querySelector(
  ".popup__input_type_description"
);

function renderCard(cardData) {
  const card = cardCreate(cardData);
  placeContainer.append(card);
}

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => renderCard(card));

profileEditButton.addEventListener("click", () => openModal(editPopup));

profileAddButton.addEventListener("click", () => openModal(cardPopup));

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const form = evt.target;
  const name = form["place-name"].value;
  const link = form["link"].value;
  renderCard({ name, link });
  closeModal(cardPopup);
}

addCardFormElement.addEventListener("submit", handleAddCardFormSubmit);

// Реализуем обработчик события submit при отправке формы по следующему шаблону.

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  const name = nameInput.value;
  const job = jobInput.value;
  // Выберите элементы, куда должны быть вставлены значения полей
  const profileName = document.querySelector(".profile__title");
  const profileDescription = document.querySelector(".profile__description");
  // Вставьте новые значения с помощью textContent
  profileName.textContent = name;
  profileDescription.textContent = job;

  closeModal(editPopup);
}

editProfileFormElement.addEventListener("submit", handleEditProfileFormSubmit);
