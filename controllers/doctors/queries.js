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

module.exports = { updateGeneralDetails, updatePersonalDetails };
