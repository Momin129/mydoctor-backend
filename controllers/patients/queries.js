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

const addAppointment =
  "Insert into appointments(appointment_id,slot_id,user_id) Values($1,$2,$3)";

const updateBookedSlots = "Update slots set booked_slots=$1 where slot_id=$2";

const getAppointments = "Select * from appointments where user_id=$1";

module.exports = {
  updateGeneralDetails,
  updatePersonalDetails,
  getGeneralDetails,
  getPersonalDetails,
  delete_Patient,
  addAppointment,
  updateBookedSlots,
  getAppointments,
};
