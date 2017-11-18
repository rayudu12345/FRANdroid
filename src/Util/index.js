export function isValidPhoneNumber(phone) {
  var regx = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

  if (regx.test(phone) === true) {
    return true;
  } else {
    return false;
  }
}

export function isValidPinCode(pin_code) {
  var regx = /^[0-9]{6}$/;

  if (regx.test(pin_code) === true) {
    return true;
  } else {
    return false;
  }
}

export function isValidAge(age) {
  age = parseInt(age);
  if (age >= 13 && age < 100) {
    return true;
  } else {
    return false;
  }
}

export function isEmpty(value) {
  if (value == '' || value == undefined) {
    return true;
  } else {
    return false;
  }
}

export function isValidAdharNumber(adhar_no) {
  var regx = /^\d{12}$/;

  if (regx.test(adhar_no) === true) {
    return true;
  } else {
    return false;
  }
}

export function isValidEmail(email) {
  var regx = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;

  if (regx.test(email) === true) {
    return true;
  } else {
    return false;
  }
}
