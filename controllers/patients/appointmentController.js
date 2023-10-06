const pool = require("../../config/db");
const { nanoid } = require("nanoid");
const {
  addAppointment,
  updateBookedSlots,
  getAppointments,
} = require("./queries");

const bookAppointment = async (req, res) => {
  const appointment_id = nanoid();
  const { slot_id, user_id, booked_slots } = req.body;
  try {
    const result = await pool.query(addAppointment, [
      appointment_id,
      slot_id,
      user_id,
    ]);
    if (result.rowCount > 0) {
      const booked = await pool.query(updateBookedSlots, [
        booked_slots + 1,
        slot_id,
      ]);
      if (booked.rowCount > 0)
        res.status(201).json({ message: "Slot booked successfully." });
    }
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong, please try again later." });
  }
};

const showAppointments = async (req, res) => {
  const user_id = req.query.user_id;
  try {
    const appointments = await pool.query(getAppointments, [user_id]);
    if (appointments.rowCount > 0) res.status(200).json({ data: appointments });
    else res.status(200).json({ data: 0 });
  } catch (error) {
    console.log(error);
    res
      .status(400)
      .json({ message: "Something went wrong please try again later." });
  }
};

module.exports = { bookAppointment, showAppointments };
