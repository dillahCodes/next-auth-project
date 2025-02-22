import prisma from "@/lib/prisma";
import createEmailResetPasswordToken from "@/lib/email-reset-password/create-email-reset-password-token";
import sendEmailResetPasswordTransporter from "@/lib/email-reset-password/send-email-reset-password-transporter";
import { SendForgotPasswordEmailAPIPayload, SendForgotPasswordEmailAPIResponse } from "@/next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { email } = (await req.json()) as SendForgotPasswordEmailAPIPayload;
    if (!email) throw new Error("Email is required");

    // Find user or throw an error
    const user = await prisma.user.findUniqueOrThrow({ where: { email }, select: { name: true } });
    if (!user.name) throw new Error("Email not found");

    // Generate reset token and send email
    const token = await createEmailResetPasswordToken(email);
    await sendEmailResetPasswordTransporter(email, user.name, token);

    return NextResponse.json<SendForgotPasswordEmailAPIResponse>({ isSuccess: true, message: "Reset password link sent to your email." });
  } catch (error) {
    return NextResponse.json<SendForgotPasswordEmailAPIResponse>(
      { isSuccess: false, message: error instanceof Error ? error.message : "Unknown Error" },
      { status: error instanceof Error && error.message === "Email not found" ? 404 : 400 }
    );
  }
}
