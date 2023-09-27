const updateUserDetails =
  "Update users set fullname=$1, email=$2, contact=$3, gender=$4 where user_id=$5 ";

const updateDoctorDetails =
  "Update doctors set languages=$1, consultation_fee=$2, bio=$3 where doctor_id=$4";

module.exports = { updateUserDetails, updateDoctorDetails };
