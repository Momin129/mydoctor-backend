const isContact = (value) => {
  const regex = /^\+?[1-9][0-9]{7,14}$/;
  if (regex.test(value)) return true;
  else return false;
};

module.exports = { isContact };
