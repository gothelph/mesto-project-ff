import { addLike, deleteCard, deleteLike } from "../api";

export const initialCards = [
  {
    name: "Норвежские фьёрды",
    link: "https://plus.unsplash.com/premium_photo-1661963290283-a1883fb9582a?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Ритен, Норвегия",
    link: "https://images.unsplash.com/photo-1526080676457-4544bf0ebba9?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Берген, Норвегия",
    link: "https://images.unsplash.com/photo-1544085311-11a028465b03?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Пляж Скагсанден, Флакстад, Норвегия",
    link: "https://images.unsplash.com/photo-1507272931001-fc06c17e4f43?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Райнебринген, Норвегия",
    link: "https://images.unsplash.com/photo-1508592931388-95bc7b61033d?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    name: "Гудванген, Норвегия",
    link: "https://images.unsplash.com/photo-1521336575822-6da63fb45455?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

// @todo: Функция создания карточки

function getTemplate() {
  return document
    .querySelector("#card-template")
    .content.querySelector(".places__item")
    .cloneNode(true);
}

export function createCard(
  { name, link, _id, likes = [], owner },
  profileId,
  { onDeleteCard, onLikeCard, onOpenPreview } = {}
) {
  const clonePattern = getTemplate();

  clonePattern.querySelector(".card__title").textContent = name;

  const imgCard = clonePattern.querySelector(".card__image");

  imgCard.src = link;
  imgCard.alt = name;

  const likeBtn = clonePattern.querySelector(".card__like-button");
  const likeCounter = clonePattern.querySelector(".likes__counter");
  likeCounter.textContent = likes.length;
  if (likes.some(({ _id }) => _id === profileId)) {
    likeBtn.classList.add("card__like-button_is-active");
  }
  likeBtn.addEventListener("click", () => {
    onLikeCard?.(likeBtn, _id, likeCounter);
  });

  // @todo: Функция удаления карточки
  const deleteBtn = clonePattern.querySelector(".card__delete-button");

  if (profileId === owner._id) {
    clonePattern.setAttribute("data-id", _id);
    deleteBtn.addEventListener("click", () => onDeleteCard?.(clonePattern));
  } else {
    deleteBtn.style.display = "none";
  }

  imgCard.addEventListener("click", () => onOpenPreview?.(name, link));

  return clonePattern;
}

//Переключатель лайков
export function onLikeCard(likeBtn, cardId, likeCounter) {
  const like = "card__like-button_is-active";
  if (likeBtn.classList.contains(like)) {
    deleteLike(cardId)
      .then((updatedLikes) => {
        likeCounter.textContent = updatedLikes.length;
        likeBtn.classList.remove(like);
      })
      .catch((err) => console.log(err));
  } else {
    addLike(cardId)
      .then((updatedLikes) => {
        likeBtn.classList.add(like);
        likeCounter.textContent = updatedLikes.length;
      })
      .catch((err) => console.log(err));
  }
}

// удаление карточки с сервера
export function onDeleteCard(cardElement) {
  const cardId = cardElement.getAttribute("data-id");
  deleteCard(cardId)
    .then(() => cardElement.remove())
    .catch((err) => console.log(err));
}
