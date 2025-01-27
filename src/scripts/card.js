import { openModal } from "./modal";

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
  { name, link },
  { onDeleteCard, onLikeCard, onOpenPreview } = {}
) {
  const clonePattern = getTemplate();

  clonePattern.querySelector(".card__title").textContent = name;

  const imgCard = clonePattern.querySelector(".card__image");

  imgCard.src = link;
  imgCard.alt = name;

  const likeBtn = clonePattern.querySelector(".card__like-button");
  likeBtn.addEventListener("click", () => onLikeCard?.(likeBtn));

  // @todo: Функция удаления карточки
  const deleteBtn = clonePattern.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", () => onDeleteCard?.(clonePattern));

  imgCard.addEventListener("click", () => onOpenPreview?.(name, link));

  return clonePattern;
}

//Переключатель лайков

export function onLikeCard(likeBtn) {
  likeBtn.classList.toggle("card__like-button_is-active");
}

export function onOpenPreview(name, link) {
  const popup = document.querySelector(".popup_type_image");
  const image = popup.querySelector(".popup__image"); // Получаем элемент изображения
  popup.querySelector(".popup__caption").textContent = name;
  image.src = link;
  // Устанавливаем атрибут alt для изображения
  image.alt = `Фотография места: ${name}`;
  openModal(popup);
}

export function onDeleteCard(cardElement) {
  cardElement.remove();
}
