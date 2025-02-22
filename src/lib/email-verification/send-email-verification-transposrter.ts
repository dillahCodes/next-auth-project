import nodemailer from "nodemailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import { emailVerificationTamplateHtml } from "./email-verification-tamplate-html";

/**
 * You must use a paid and valid email domain to avoid being marked as spam.
 * Free email services like Gmail, Yahoo, and Outlook are not recommended for sending emails.
 * This is using a free email from https://app.brevo.com/settings/keys/smtp for testing,
 * with a limit of 100 emails per day.
 *
 * When sending emails, there are three key authentication pillars
 * to prevent emails from being marked as spam or rejected by recipients:
 * SPF, DKIM, & DMARC.
 *
 *        - SPF (Sender Policy Framework):
 *          Ensures that the sending mail server is authorized to send emails
 *          on behalf of a domain.
 *          Imagine a guest list at an event—only people on the list are allowed in.
 *
 *        - DKIM (DomainKeys Identified Mail):
 *          Adds a cryptographic signature to the email, proving that the email
 *          has not been altered during transit and was genuinely sent from the domain.
 *          Imagine sealing a letter with wax; if the seal is broken, you know it was tampered with.
 *
 *        - DMARC (Domain-based Message Authentication, Reporting & Conformance):
 *          Defines how recipients should handle emails that fail SPF or DKIM checks.
 *          It also provides reporting for visibility into unauthorized email use.
 *          Imagine a security policy that instructs the guards on what to do
 *          if someone tries to enter with a fake ID.
 */

/**
 * Sends a verification email to the specified user.
 *
 * @param {string} email - The email address of the user to send the verification email to.
 * @param {string} userName - The name of the user to personalize the verification email.
 * @param {string} token - The verification token to be included in the verification URL.
 * @returns {Promise<void>} A promise that resolves when the email has been sent.
 *
 * @throws {Error} If there is an error sending the email.
 *
 * @example
 * ```typescript
 * await sendVerificationEmailTransporter('user@example.com', 'John Doe', '12345-67890');
 * ```
 */
export async function sendVerificationEmailTransporter(email: string, userName: string, token: string) {
  const queryParams: Record<string, string> = { token, email };
  const verifyUrl = `${process.env.BASE_URL}/verify-email?` + new URLSearchParams(queryParams).toString();

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
    subject: "Verify Your Email",
    html: emailVerificationTamplateHtml(verifyUrl, userName),
  };

  await transporter.sendMail(mailOptions);
  /**
   * Uncomment the code below to debug.
   **/
  // transporter.sendMail(mailOptions, (error, info) => {
  //   if (error) console.log("Failed to send email:", error);
  //   else console.log("Email sent:", info.response);
  // });
}
