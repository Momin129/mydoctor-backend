const { nanoid } = require("nanoid");
const { create_slot, if_slot_exists } = require("./queries");
const pool = require("../../config/db");

const createSlot = async (req, res) => {
  const slot_id = nanoid();
  const { hopital_id, user_id, slot_size, start_time, end_time } = req.body;

  try {
    const slot = await pool.query(create_slot, [
      slot_id,
      hopital_id,
      user_id,
      slot_size,
      start_time,
      end_time,
    ]);
    if (slot.rowCount > 0)
      res.status(201).json({ message: "Slot created successfully." });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
};

const ifSlotExists = async (req, res) => {
  const user_id = req.query.user_id;
  const start_time = req.query.start_time;

  try {
    const result = await pool.query(if_slot_exists, [user_id, start_time]);
    if (result.rowCount > 0)
      res.status(200).json({ message: "This time slot already exists." });
    else res.status(200).json({ message: "" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: "Something went wrong." });
  }
};

module.exports = { createSlot, ifSlotExists };
