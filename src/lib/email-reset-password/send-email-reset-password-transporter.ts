import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import emailResetPasswordTamplateHtml from "./email-reset-password-tamplate-html";

const sendEmailResetPasswordTransporter = async (email: string, userName: string, token: string) => {
  const queryParams: Record<string, string> = { token, email, userName };
  const resetPasswordUrl = `${process.env.BASE_URL}/verify-forgot-password?` + new URLSearchParams(queryParams).toString();

  const transporter = nodemailer.createTransport(
    new SMTPTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })
  );

  const mailOptions = {
    from: `"Next Auth Project" <${process.env.SMTP_EMAIL_FROM}>`,
    to: email,
    subject: "Reset Password",
    html: emailResetPasswordTamplateHtml(resetPasswordUrl, userName),
  };

  await transporter.sendMail(mailOptions);
};

export default sendEmailResetPasswordTransporter;
