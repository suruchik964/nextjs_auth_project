import nodemailer from "nodemailer";
import User from "@/src/models/user_model";
import bcrypt from "bcryptjs";

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    //create hashed token
    const hashed_token = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashed_token,
        verifyTokenExpiry: Date.now() + 3600000,
      });
    } else if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashed_token,
        forgotPasswordTokenExpiry: Date.now() + 3600000,
      });
    }

    //create transport
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILTRAP_USER,
        pass: process.env.MAILTRAP_PASS,
      },
    });

    const mailOptions = {
      from: "sk@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify your email" : "Reset your password",

      html: `
    <p>
      Click 
      <a href="${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "reset-password"
      }?token=${hashed_token}">
        here
      </a> 
      to ${
        emailType === "VERIFY" ? "verify your email" : "reset your password"
      }.
    </p>

    <p>If the link doesn’t work, paste this in your browser:</p>
    <p>${process.env.DOMAIN}/${
        emailType === "VERIFY" ? "verifyemail" : "reset-password"
      }?token=${hashed_token}</p>
  `,
    };

    console.log("Sending email...");

    const mailresponse = await transport.sendMail(mailOptions);
    console.log("Mail Sent:", mailresponse);
    return mailresponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
