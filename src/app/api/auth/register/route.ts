import { createEmailVerificationToken } from "@/lib/email-verification/create-email-verification-token";
import { sendVerificationEmailTransporter } from "@/lib/email-verification/send-email-verification-transposrter";
import prisma from "@/lib/prisma";
import { RegisterAPIResponse } from "@/next-auth";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    if (!rawBody) return NextResponse.json<RegisterAPIResponse>({ isSuccess: false, message: "Request body is missing" }, { status: 400 });

    const { userName, email, password } = JSON.parse(rawBody);

    // check if required fields are present
    const errors = [
      { condition: !userName, message: "Username is required", status: 400 },
      { condition: !email, message: "Email is required", status: 400 },
      { condition: !password, message: "Password is required", status: 400 },
    ];

    const error = errors.find((err) => err.condition);
    if (error) return NextResponse.json<RegisterAPIResponse>({ isSuccess: false, message: error.message }, { status: error.status });

    // Check if email is already registered
    if (await prisma.user.findUnique({ where: { email } })) {
      return NextResponse.json<RegisterAPIResponse>({ isSuccess: false, message: "Email already in use" }, { status: 400 });
    }

    // Hash password and create user
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await prisma.user.create({ data: { name: userName, email, password: hashedPassword } });

    // create user account data
    await prisma.account.create({
      data: { userId: newUser.id, type: "credentials", provider: "credentials", providerAccountId: newUser.id },
    });

    // Create verification token
    const token = await createEmailVerificationToken(email);

    // Send verification email
    await sendVerificationEmailTransporter(email, userName, token);

    // Return success response
    return NextResponse.json<RegisterAPIResponse>({ isSuccess: true, message: "Email verification has been sent." }, { status: 201 });
  } catch (error) {
    console.error("Register Error:", error);
    return NextResponse.json<RegisterAPIResponse>({ isSuccess: false, message: "Something went wrong" }, { status: 500 });
  }
}
