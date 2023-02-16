const nameElement = document.querySelector('#name')
const emailElement = document.querySelector('#email')
const cardElement = document.querySelector('#card')
const formElement = document.querySelector('#form')

function isRequired(value) {
  return value === '' ? false : true;
}

function isValidCharacters(value) {
  const regex = /^[a-zA-Z ]+$/;
  return regex.test(value);
}

function isBetween(length, min, max) {
  return length < min || length > max ? false : true;
}

function isEmailValid(email) {
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regex.test(email);
}

function isValidMastercard(card) {
  const regex = /^5[1-5][0-9]{14}|^(222[1-9]|22[3-9]\\d|2[3-6]\\d{2}|27[0-1]\\d|2720)[0-9]{12}$/;
  return regex.test(card);
}

function isValidVisa(card) {
  const regex = /^4[0-9]{12}(?:[0-9]{3})?$/
  return regex.test(card)
}

function isLuhnValid(card) {
  if (!card) return false;
  let sum = 0;
  let currentDigit = 0;
  let isEvenPosition = false;
  value = card.replace(/\D/g, "");

  for (let position = value.length - 1; position >= 0; position--) {
    const characterValue = value.charAt(position);
    currentDigit = parseInt(characterValue, 10);
    if (isEvenPosition) {
      if ((currentDigit *= 2) > 9) {
        currentDigit -= 9;
      }
    }
    sum += currentDigit;
    isEvenPosition = !isEvenPosition;
  }
  return (sum % 10) == 0;
}

function isCardValid(card) {
  return isValidMastercard(card) || isValidVisa(card);
}

function displayError(input, message) {
  const formField = input.parentElement.parentElement;
  formField.classList.remove('success');
  formField.classList.add('error');
  const error = formField.querySelector('small');
  error.classList.remove('hide');
  error.classList.add('show');
  error.textContent = message;
}

function displaySuccess(input) {
  const formField = input.parentElement.parentElement;
  formField.classList.remove('error');
  formField.classList.add('success');
  const error = formField.querySelector('small');
  error.classList.add('hide');
  error.classList.remove('show');
  error.textContent = '';
}

function checkName() {
  let isNameInputValid = false;
  const minNameLength = 3;
  const maxNameLength = 35;
  const name = nameElement.value.trim();

  if (!isRequired(name)) {
    displayError(nameElement, "Name cannot be blank.");
  } else if (!isBetween(name.length, minNameLength, maxNameLength)) {
    displayError(
      nameElement,
      `Name must be between ${minNameLength} and ${maxNameLength} characters.`
    );
  } else if (!isValidCharacters(name)) {
    displayError(nameElement, "Name must only be letters.")
  } else {
    displaySuccess(nameElement);
    isNameInputValid = true;
  }
  return isNameInputValid;
}

function checkEmail() {
  let isEmailInputValid = false;
  const email = emailElement.value.trim();
  if (!isRequired(email)) {
    displayError(emailElement, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    displayError(emailElement, "Email is not valid.");
  } else {
    displaySuccess(emailElement);
    isEmailInputValid = true;
  }
  return isEmailInputValid;
}

function checkCard() {
  let isCardInputValid = false;
  const card = cardElement.value.trim();
  if (!isRequired(card)) {
    displayError(cardElement, "Card cannot be blank.");
  } else if (!isCardValid(card) || !isLuhnValid(card)) {
    displayError(cardElement, "Card is not valid.");
  } else {
    displaySuccess(cardElement);
    isCardInputValid = true;
  }
  return isCardInputValid;
}

formElement.addEventListener('submit', function(event) {
  event.preventDefault();

  let isNameInputValid = checkName();
  let isEmailInputValid = checkEmail();
  let isCardInputValid = checkCard();

  let isFormValid = 
    isNameInputValid &&
    isEmailInputValid &&
    isCardInputValid;

  if (isFormValid) {
    // send form data to back end
    // redirect to next page
    console.log("Success!!");

    // clear form to imply information was sent.
    document.getElementById("form").reset();
    const formFields = document.querySelectorAll(".form-field");
    formFields.forEach(element => element.classList.remove("success"));
  }
});

formElement.addEventListener('input', function(event) {
  switch(event.target.id) {
    case 'name':
      checkName()
      break;
    case 'email':
      checkEmail()
      break;
    case 'card':
      checkCard()
      break;
  }
});
