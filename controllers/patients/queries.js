const updateGeneralDetails = (generalDetails, user_id) => {
  let query = "UPDATE users SET ";

  const set = Object.keys(generalDetails)
    .map((v) => `${v}='${generalDetails[v]}'`)
    .join(",");

  query += set + ` WHERE user_id='${user_id}';`;

  return query;
};

const updatePersonalDetails = (personalDetails, user_id) => {
  let query = "UPDATE patients SET ";

  const set = Object.keys(personalDetails)
    .map((v) => `${v}='${personalDetails[v]}'`)
    .join(",");

  query += set + ` WHERE user_id='${user_id}';`;

  return query;
};

const getGeneralDetails =
  "Select fullname,contact,email,gender from users where user_id = $1";

const getPersonalDetails =
  "Select dob,blood_group,house_no,street,city,state,country,pincode from patients where user_id = $1";

const delete_Patient = "Update users set deleted=true where user_id = $1";

module.exports = {
  updateGeneralDetails,
  updatePersonalDetails,
  getGeneralDetails,
  getPersonalDetails,
  delete_Patient,
};
