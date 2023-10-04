const pool = require("../../config/db");
const { delete_Patient } = require("./queries");

const deletePatient = async (req, res) => {
  const user_id = req.params.user_id;
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    await client.query(delete_Patient, [user_id]);
    await client.query("COMMIT");
    res.status(200).json({ message: "Deleted Successfully." });
  } catch (error) {
    await client.query("ROLLBACK");
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  } finally {
    client.release();
  }
};

module.exports = { deletePatient };
