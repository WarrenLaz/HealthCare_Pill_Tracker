const nodemailer = require("nodemailer");

async function sendSecureEmail(Email_Address, Password) {
  console.log("\x1bPASSWORD: \x1b[0m" + Password);
  try {
    // 1️⃣ Configure the email transporter
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com", // SMTP service (Gmail, Outlook, etc.)
      port: 465, // Port for secure connections (SSL/TLS)
      secure: true, // Use SSL/TLS
      auth: {
        user: process.env.Email, // Email address from .env
        pass: process.env.Password, // Email password from .env
      },
    });

    // 2️⃣ Set email options
    const mailOptions = {
      from: process.env.Email, // Sender address
      to: Email_Address, // Recipient(s)
      subject: "Secure Email from ReplenX", // Email subject
      text: Password, // Plain text body
      html: "<p>This is a Password: </p> <strong>" + Password + "</strong>", // HTML email body
    };

    // 3️⃣ Send the email
    const info = await transporter.sendMail(mailOptions);
    console.log("Email sent successfully:", info.messageId);
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendSecureEmail