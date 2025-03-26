const db = require("../dbcontroller");
const { ObjectId } = require("mongodb");

const getUser = (req, res) => {
  db.getData(db.getDB("Physicians", "Physician"), {
    _id: ObjectId(req.user["user"]),
  })
    .then((data) => data[0])
    .then((data) => {
      res.send({
        id: data["_id"],
        First_Name: data["First_Name"],
        Last_Name: data["Last_Name"],
        Email_Address: data["Email_Address"],
        Phone_Number: data["Phone_Number"],
        jwtauth: data["jwtauth"],
      });
    });
};
const updatePhysician = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    // Validate ObjectId format
    if (!ObjectId.isValid(id)) {
      return res.status(400).json({ error: "Invalid Physician ID" });
    }
    const physicianId = new ObjectId(id);

    // Prevent updating restricted fields like _id
    delete updates._id;

    // Check if physician exists before updating
    const physician = await db
      .getDB("Physicians", "Physician")
      .findOne({ _id: physicianId });
    if (!physician) {
      return res.status(404).json({ error: "Physician not found" });
    }

    // Check for duplicate email or phone number (excluding current physician)
    const conflict = await db.getDB("Physicians", "Physician").findOne({
      _id: { $ne: physicianId },
      $or: [
        { Email_Address: updates.Email_Address },
        { Phone_Number: updates.Phone_Number },
      ],
    });

    if (conflict) {
      return res.status(400).json({
        error:
          "Email Address or Phone Number already exists for another physician",
      });
    }

    // Perform the update
    const result = await db
      .getDB("Physicians", "Physician")
      .updateOne({ _id: physicianId }, { $set: updates });

    // Check if any changes were made
    if (result.modifiedCount === 0) {
      return res
        .status(200)
        .json({ message: "No changes made to the physician record" });
    }

    res.json({ message: "Physician successfully updated" });
  } catch (err) {
    console.error("Error updating physician:", err);
    res.status(500).json({ error: "An internal error occurred" });
  }
};

module.exports = { getUser, updatePhysician };
