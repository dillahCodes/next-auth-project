import { createEmailVerificationToken } from "@/lib/email-verification/create-email-verification-token";
import { sendVerificationEmailTransporter } from "@/lib/email-verification/send-email-verification-transposrter";
import prisma from "@/lib/prisma";
import { SendEmailAPIPayload, SendEmailAPIResponse } from "@/next-auth";
import { NextResponse } from "next/server";

export async function POST(req: Request): Promise<NextResponse<SendEmailAPIResponse>> {
  try {
    const { email } = (await req.json()) as SendEmailAPIPayload;
    if (!email) return NextResponse.json<SendEmailAPIResponse>({ isSuccess: false, message: "Email is required" }, { status: 400 });

    // Generate new verification token
    const token = await createEmailVerificationToken(email);

    // Get user name
    const user = await prisma.user.findUnique({ where: { email }, select: { name: true } });
    const userName = user?.name || "";

    // Send verification email
    await sendVerificationEmailTransporter(email, userName, token);

    // Return success response
    return NextResponse.json<SendEmailAPIResponse>({ isSuccess: true, message: "Email verification has been sent." }, { status: 200 });
  } catch (error) {
    return NextResponse.json<SendEmailAPIResponse>({ isSuccess: false, message: "Unknown Error" }, { status: 500 });
  }
}
