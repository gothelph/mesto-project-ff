import {
  initialCards,
  createCard,
  likeCard,
  openCard,
  deleteCard,
} from "./card";
import { openModal, closeModal, initPopups } from "./modal";

// @todo: Темплейт карточки
const placeContainer = document.querySelector(".places__list");
// @todo: DOM узлы
const editPopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
// @todo: вывод карточек
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
//@todo submit
const profileForm = document.forms["edit-profile"];
const cardForm = document.forms["new-place"];
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_description");

initPopups();

// @todo: Вывести карточки на страницу
initialCards.forEach((card) => renderCard(card));

cardForm.addEventListener("submit", handleAddCardFormSubmit);
profileForm.addEventListener("submit", handleEditProfileFormSubmit);

profileEditButton.addEventListener("click", editProfileModalOpen);
profileAddButton.addEventListener("click", () => openModal(cardPopup));

function renderCard(cardData) {
  const card = createCard(cardData, deleteCard, likeCard, openCard);
  placeContainer.prepend(card);
}

function editProfileModalOpen() {
  nameInput.value = profileName.textContent;
  jobInput.value = profileDescription.textContent;
  openModal(editPopup);
}

function handleAddCardFormSubmit(evt) {
  evt.preventDefault();
  const name = cardForm["place-name"].value;
  const link = cardForm["link"].value;
  renderCard({ name, link });
  closeModal(cardPopup);
  cardForm.reset();
}

// Реализуем обработчик события submit при отправке формы по следующему шаблону.

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  // Получите значение полей jobInput и nameInput из свойства value
  const name = nameInput.value;
  const job = jobInput.value;
  // Вставьте новые значения с помощью textContent
  profileName.textContent = name;
  profileDescription.textContent = job;

  closeModal(editPopup);
  profileForm.reset();
}
