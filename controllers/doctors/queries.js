const updateGeneralDetails = (generalDetails, user_id) => {
  let query = "UPDATE users SET ";

  const set = Object.keys(generalDetails)
    .map((v) => `${v}='${generalDetails[v]}'`)
    .join(",");

  query += set + ` WHERE user_id='${user_id}';`;

  return query;
};

const updatePersonalDetails = (personalDetails, user_id) => {
  let query = "UPDATE doctors SET ";

  const set = Object.keys(personalDetails)
    .map((v) => {
      if (v == "experience" || v == "qualifications")
        return `${v}='${JSON.stringify(personalDetails[v])}'`;
      else if (v == "specialities") return `${v}='{${personalDetails[v]}}'`;
      else return `${v}='${personalDetails[v]}'`;
    })
    .join(",");

  query += set + ` WHERE user_id='${user_id}';`;

  return query;
};

const getGeneralDetails =
  "Select fullname,contact,email,gender from users where user_id = $1";

const getPersonalDetails =
  "Select licence_number,specialities,experience,qualifications,bio from doctors where user_id = $1";

const create_slot =
  "Insert into slots (slot_id,hospital_id,user_id,slot_size,start_time,end_time) Values($1,$2,$3,$4,%,$6)";

const if_slot_exists =
  "Select * from slots where user_id = $1  and start_time=$2";

module.exports = {
  updateGeneralDetails,
  updatePersonalDetails,
  getGeneralDetails,
  getPersonalDetails,
  create_slot,
  if_slot_exists,
};
