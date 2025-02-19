export const VALIDATION_SETTINGS = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_visible",
};

//Обработка ошибок

const showInputError = ({
  formElement,
  inputElement,
  errorMessage,
  validationSettings: {
    inputErrorClass,
    errorClass,
    inactiveButtonClass,
    submitButtonSelector,
  },
}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  const submitButton = formElement.querySelector(submitButtonSelector);
  submitButton.classList.add(inactiveButtonClass);

  inputElement.classList.add(inputErrorClass);

  errorElement.classList.add(errorClass);
  errorElement.textContent = errorMessage;
};

const hideInputError = ({
  formElement,
  inputElement,
  validationSettings: {
    inputErrorClass,
    errorClass,
    inactiveButtonClass,
    submitButtonSelector,
  },
}) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  const submitButton = formElement.querySelector(submitButtonSelector);
  submitButton.classList.remove(inactiveButtonClass);

  inputElement.classList.remove(inputErrorClass);

  errorElement.classList.remove(errorClass);
  errorElement.textContent = "";
};

const isValid = ({ formElement, inputElement, validationSettings }) => {
  if (!inputElement.validity.valid) {
    let errorMessage = inputElement.validationMessage;

    if (inputElement.validity.patternMismatch) {
      errorMessage = inputElement.getAttribute("data-pattern-error-message");
    }

    showInputError({
      formElement,
      inputElement,
      errorMessage,
      validationSettings,
    });
  } else {
    hideInputError({ formElement, inputElement, validationSettings });
  }
};

const setEventListeners = (formElement, validationSettings) => {
  const { inputSelector } = validationSettings;
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid({ formElement, inputElement, validationSettings });
    });
  });
};

export const clearValidation = (
  formElement,
  {
    inputSelector,
    submitButtonSelector,
    inactiveButtonClass,
    inputErrorClass,
    errorClass,
  }
) => {
  const inputList = Array.from(formElement.querySelectorAll(inputSelector));
  const submitButton = formElement.querySelector(submitButtonSelector);
  submitButton.classList.add(inactiveButtonClass);

  inputList.forEach((inputElement) => {
    hideInputError({ formElement, inputElement, inputErrorClass, errorClass });
  });
};

export const enableValidation = (validationSettings) => {
  const { formSelector } = validationSettings;
  const formElements = Array.from(document.querySelectorAll(formSelector));

  formElements.forEach((formElement) => {
    setEventListeners(formElement, validationSettings);
  });
};
