import {
  editProfile,
  fetchCards,
  fetchProfile,
  addCards,
  updateAvatar,
} from "../api";

import { createCard, onLikeCard, onDeleteCard } from "./card";
import { openModal, closeModal, initPopups } from "./modal";
import { enableValidation, VALIDATION_SETTINGS } from "./validation";

// @todo: Темплейт карточки
const placeContainer = document.querySelector(".places__list");
// @todo: DOM узлы
const editPopup = document.querySelector(".popup_type_edit");
const cardPopup = document.querySelector(".popup_type_new-card");
const profileImage = document.querySelector(".profile__image");
const profileAvatar = document.querySelector(".popup_type_avatar");
const profileImageAvatar = profileImage.querySelector(".profile__image-avatar");

// @todo: вывод карточек
const popupPreview = document.querySelector(".popup_type_image");
const popupPreviewImage = popupPreview.querySelector(".popup__image");
const popupPreviewCaption = popupPreview.querySelector(".popup__caption");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
//@todo submit

const profileForm = document.forms["edit-profile"];
const cardForm = document.forms["new-place"];
const editAvatarForm = document.forms["edit-avatar"];
const nameInput = profileForm.querySelector(".popup__input_type_name");
const jobInput = profileForm.querySelector(".popup__input_type_description");

export function onOpenPreview(name, link) {
  popupPreviewCaption.textContent = name;
  popupPreviewImage.src = link;
  popupPreviewImage.alt = `Фотография места: ${name}`;
  openModal(popupPreview);
}

function renderCard(cardData, profileId) {
  const card = createCard(cardData, profileId, {
    onDeleteCard,
    onLikeCard,
    onOpenPreview,
  });
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

  setLoadingState(cardForm);

  addCards({ name, link })
    .then((cardData) => {
      renderCard(cardData, cardData.owner._id);
      closeModal(cardPopup);
      cardForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      unSetLoadingState(cardForm);
    });
}

// Реализуем обработчик события submit при отправке формы по следующему шаблону.
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const about = jobInput.value;

  setLoadingState(profileForm);

  editProfile({ name, about })
    .then(({ name, about }) => {
      profileName.textContent = name;
      profileDescription.textContent = about;
      closeModal(editPopup);
      profileForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      unSetLoadingState(profileForm);
    });
}

function setLoadingState(form) {
  const submitButton = form.querySelector("button");
  submitButton.classList.add("popup__button_disabled");
  submitButton.textContent = "Сохранение...";
}

function unSetLoadingState(form) {
  const submitButton = form.querySelector("button");
  submitButton.classList.remove("popup__button_disabled");
  submitButton.textContent = "Сохранить";
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  const url = editAvatarForm["avatar"].value;

  setLoadingState(editAvatarForm);
  updateAvatar(url)
    .then(({ avatar }) => {
      profileImageAvatar.src = avatar;
      closeModal(profileAvatar);
      editAvatarForm.reset();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      unSetLoadingState(editAvatarForm);
    });
}

initPopups();

Promise.all([fetchProfile(), fetchCards()])
  .then(([profileInfo, cards]) => {
    const { name, about, avatar, _id } = profileInfo;
    profileName.textContent = name;
    profileDescription.textContent = about;
    profileImageAvatar.src = avatar;

    cards
      .toSorted((a, b) => {
        const timestampA = new Date(a.createdAt).getTime();
        const timestampB = new Date(b.createdAt).getTime();
        return timestampA - timestampB;
      })
      .forEach((cards) => renderCard(cards, _id));
  })
  .catch((err) => {
    console.log(err);
  });

cardForm.addEventListener("submit", handleAddCardFormSubmit);
profileForm.addEventListener("submit", handleEditProfileFormSubmit);
editAvatarForm.addEventListener("submit", handleEditAvatarFormSubmit);
profileEditButton.addEventListener("click", editProfileModalOpen);
profileAddButton.addEventListener("click", () => openModal(cardPopup));
profileImage.addEventListener("click", () => openModal(profileAvatar));

enableValidation(VALIDATION_SETTINGS);
