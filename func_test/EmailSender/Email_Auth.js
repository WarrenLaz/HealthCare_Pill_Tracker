const nodemailer = require('nodemailer');
async function sendSecureEmail() {
    try {
      // 1️⃣ Configure the email transporter
      const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com', // SMTP service (Gmail, Outlook, etc.)
        port: 465, // Port for secure connections (SSL/TLS)
        secure: true, // Use SSL/TLS
        auth: {
          user: "", // Email address from .env
          pass: "", // Email password from .env
        },
      });
  
      // 2️⃣ Set email options
      const mailOptions = {
        from: process.env.EMAIL_USER, // Sender address
        to: 'wjlaz@umich.edu', // Recipient(s)
        subject: '', // Email subject
        text: '', // Plain text body
        html: '", // HTML email body
      };
  
      // 3️⃣ Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent successfully:', info.messageId);
    } catch (error) {
      console.error('Error sending email:', error);
    }
  }

  sendSecureEmail();
