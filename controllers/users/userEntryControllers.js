const pool = require("../../config/db");
const {
  insertUser,
  insertPatient,
  insertDoctor,
  insertHospital,
} = require("./queries");
const generateUniqueId = require("generate-unique-id");

const registerUser = async (req, res) => {
  try {
    const user_id = generateUniqueId({ length: 16, useLetters: false });
    const { fullname, email, password, contact, gender, role } = req.body;

    // user Registration
    pool.query(
      insertUser,
      [user_id, fullname, email, password, contact, gender, role],
      (error, result) => {
        if (error) {
          console.log(error);
          res.status(400).json({ message: "Something went wrong. Parent" });
        } else {
          let insertFunction;
          if (role == "patient") insertFunction = insertPatient;
          else if (role == "doctor") insertFunction = insertDoctor;
          else insertFunction = insertHospital;

          const user_id = result.rows[0]["user_id"];
          const role_id = generateUniqueId({ length: 16, useLetters: false });

          // type of user data insetion
          pool.query(insertFunction, [role_id, user_id], (err, result) => {
            if (err)
              res.status(400).json({ message: "Something went wrong", err });
            else res.status(200).json({ message: "Registered successfully" });
          });
        }
      }
    );
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error });
  }
};

const loginUser = async (req, res) => {};

module.exports = { registerUser };
