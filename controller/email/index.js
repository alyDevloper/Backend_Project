import nodemailer from "nodemailer";

// Function to generate a random OTP
const generateOTP = () => {
  const digits = "0123456789";
  let OTP = "";
  for (let i = 0; i < 6; i++) {
    OTP += digits[Math.floor(Math.random() * 10)];
  }
  return OTP;
};

// Function to verify OTP
const verifyOTP = (enteredOTP, generatedOTP) => enteredOTP === generatedOTP;

const emailController = {
  sendEmail: (req, res) => {
    // Generate OTP
    const otp = generateOTP();

    const transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "9c612a19248ea9",
        pass: "b3933dffbb56a7",
      },
    });

    const mailOptions = {
      from: '"Your Name" <your_email@example.com>',
      to: "<recipient@example.com>",
      subject: "Forgot Password - OTP",
      text: `Your OTP for resetting password is: ${otp}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email: ", error);
        res.status(500).json({ error: "Failed to send email" });
      } else {
        console.log("Email sent: ", info.response);

        res.status(200).json({
          message: "Email sent successfully",
          otp: otp,
        });
      }
    });
  },

  verifyOTP: (req, res) => {
    const { enteredOTP } = req.body;

    // Retrieve the OTP sent to the user's email
    const generatedOTP = req.body.otp;

    // Verify the entered OTP
    if (verifyOTP(enteredOTP, generatedOTP)) {
      res.json({ message: "OTP verified successfully" });
    } else {
      res.status(400).json({ error: "Invalid OTP" });
    }
  },
};

export default emailController;
