import {
  editProfile,
  fetchCards,
  fetchProfile,
  addCards,
  updateAvatar,
} from "../api";

import { createCard, onLikeCard, onOpenPreview, onDeleteCard } from "./card";
import {
  openModal,
  closeModal,
  initPopups,
  setLoadingState,
  unSetLoadingState,
} from "./modal";
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
  renderCard({ name, link });
  addCards({ name, link });
  closeModal(cardPopup);
  cardForm.reset();
}

// Реализуем обработчик события submit при отправке формы по следующему шаблону.
function handleEditProfileFormSubmit(evt) {
  evt.preventDefault();
  const name = nameInput.value;
  const about = jobInput.value;

  editProfile({ name, about })
    .then(({ name, about }) => {
      profileName.textContent = name;
      profileDescription.textContent = about;
      closeModal(editPopup);
      profileForm.reset();
    })
    .catch((err) => console.log(err));
}

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault();
  const url = editAvatarForm["avatar"].value;

  setLoadingState(editAvatarForm);
  updateAvatar(url)
    .then(() => {
      profileImageAvatar.src = url;
      editAvatarForm.reset();
      closeModal(profileAvatar);
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      unSetLoadingState(editAvatarForm);
    });
}

initPopups();

fetchProfile()
  .then(({ name, about, avatar, _id }) => {
    profileName.textContent = name;
    profileDescription.textContent = about;
    profileImageAvatar.src = avatar;
    fetchCards()
      .then((cards) =>
        cards
          .toSorted(
            (a, b) =>
              //сортировка по времени добавления
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          )
          .forEach((cards) => renderCard(cards, _id))
      )
      .catch((err) => {
        console.log(err);
      });
  })
  .catch((err) => {
    console.log(err);
  });

// @todo: Вывести карточки на страницу

//Редактирование профиля
cardForm.addEventListener("submit", handleAddCardFormSubmit);
profileForm.addEventListener("submit", handleEditProfileFormSubmit);
editAvatarForm.addEventListener("submit", handleEditAvatarFormSubmit);
profileEditButton.addEventListener("click", editProfileModalOpen);
profileAddButton.addEventListener("click", () => openModal(cardPopup));
profileImage.addEventListener("click", () => openModal(profileAvatar));

enableValidation(VALIDATION_SETTINGS);
