export const checkValidity = (value, rules) => {
  let isValid = true;

  if (rules.required) {
    isValid = value.trim() !== '' && isValid;
  }

  if(rules.isEmail) {
    const pattern = /^\w+([.-]?\w+)*@\w+([-]?\w+)*(\.\w{2,3})+$/;
    isValid = pattern.test(value) && isValid;
  }

  return isValid;
}
