const form = document.querySelector(".user-form");

const formValidator = (e) => {
  e.preventDefault();
  inputs.forEach((input) => {
    input.focus();
    input.blur();
  });
  if (form.checkValidity()) {
    form.remove();
    document.querySelector(".thank-you-msg").style.display = "block";
  }
};

const InputValidator = (event) => {
  let input = event.target;
  let inputType = event.target.name;
  let inputTypeName = inputType.charAt(0).toUpperCase() + inputType.slice(1);
  resetInput(input);
  checkIfValueMissing(input, inputTypeName);
  if (inputType === "email" && !checkIfValueMissing(input, inputTypeName)) {
    checkIfValidEmail(input, inputTypeName);
  }
  if (inputType === "zip" && !checkIfValueMissing(input, inputTypeName)) {
    checkIfValidNumber(input, inputTypeName);
  }
  if (inputType === "password" && !checkIfValueMissing(input, inputTypeName)) {
    checkValidPassword(input, inputTypeName);
  }
  if (inputType === "passwordConfirm") {
    checkPasswordMatch(input, inputTypeName);
  }
};

const checkIfValueMissing = (input, inputTypeName) => {
  if (!input.value) {
    let errorHint = `${inputTypeName} can not be empty!`;
    input.setCustomValidity(`Please enter your ${inputTypeName}!`);
    invalidInput(input, errorHint);
    return true;
  } else {
    return false;
  }
};

const checkIfValidEmail = (input, inputTypeName) => {
  const validateEmailReg =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  let emailBool = validateEmailReg.test(String(input.value).toLowerCase());
  if (!emailBool) {
    let errorHint = `That is not a valid ${inputTypeName}!`;
    input.setCustomValidity(`Please enter your ${inputTypeName}!`);
    invalidInput(input, errorHint);
  }
};

const checkIfValidNumber = (input, inputTypeName) => {
  if (!Number(input.value)) {
    let errorHint = `${inputTypeName} should be a number!`;
    input.setCustomValidity(`Please enter your ${inputTypeName}!`);
    invalidInput(input, errorHint);
  }
};

const checkValidPassword = (input, inputTypeName) => {
  if (input.value.length < 8) {
    let errorHint = `${inputTypeName} should be at leat 8 characters!`;
    invalidInput(input, errorHint);
  }
  let passConfirmInput = inputs.find(
    (input) => input.name === "passwordConfirm"
  );
  if (checkPasswordMatch(passConfirmInput, passConfirmInput.name)) {
    resetInput(passConfirmInput);
  }
};

const checkPasswordMatch = (input, inputTypeName) => {
  let prevInput = inputs.find((input) => input.name === "password");
  if (input.value != prevInput.value) {
    let errorHint = `${inputTypeName} does not match!`;
    invalidInput(input, errorHint);
  } else {
    return true;
  }
};

const invalidInput = (input, errorHint) => {
  input.checkValidity();
  input.nextElementSibling.textContent = errorHint;
  input.nextElementSibling.classList.remove("invisible");
  input.addEventListener("input", InputValidator);
};

const resetInput = (input) => {
  input.nextElementSibling.classList.add("invisible");
  input.setCustomValidity("");
};

const grabInputs = () => {
  return Array.from(form.elements).filter((input) => input.type != "submit");
};

const inputs = grabInputs();
inputs.forEach((input) => input.addEventListener("focusout", InputValidator));

form.addEventListener("submit", formValidator);
