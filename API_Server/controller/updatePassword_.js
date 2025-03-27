const db = require("./dbcontroller");
const sha256 = require("../encryptor/sha256");

const updatePassword = (req, res) => {
  console.log("Received request body:", req.body);

  const { Email_Address, newPassword } = req.body;

  if (!Email_Address || !newPassword) {
    console.error("Missing email or password:", req.body);
    return res
      .status(400)
      .json({ status: "Error", message: "Missing email or password." });
  }

  const hashedPassword = sha256(newPassword);

  // ---------- Debug Logging ----------
  console.log("Updating password for:", Email_Address);
  console.log("Raw new password:", newPassword);
  console.log("Hashed new password:", hashedPassword);
  // -----------------------------------

  db.updateData(
    db.getDB("Patients", "patient"),
    { Email_Address: Email_Address.toLowerCase() },
    { $set: { Password: hashedPassword, isNew: 0 } }
  )
    .then(() =>
      res.json({ status: "200 OK", message: "Password updated successfully." })
    )
    .catch((err) => {
      console.error("Error updating password:", err);
      res
        .status(500)
        .json({ status: "Error", message: "Failed to update password." });
    });
};

module.exports = updatePassword;
