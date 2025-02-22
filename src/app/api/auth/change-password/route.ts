import prisma from "@/lib/prisma";
import { ResetPasswordAPIPayload } from "@/next-auth";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  try {
    // Read the raw request body
    const rawBody = await req.text();
    if (!rawBody) {
      return NextResponse.json({ isSuccess: false, message: "Request body is missing" }, { status: 400 });
    }

    // Parse the request body
    const { email, password, confirmPassword } = JSON.parse(rawBody) as ResetPasswordAPIPayload;

    // Input validation rules
    const errors = [
      { condition: !email, message: "Email is required", status: 400 },
      { condition: !password, message: "Password is required", status: 400 },
      { condition: !confirmPassword, message: "Confirm password is required", status: 400 },
      { condition: password !== confirmPassword, message: "Passwords do not match", status: 400 },
    ];

    // Check for validation errors
    const error = errors.find((err) => err.condition);
    if (error) {
      return NextResponse.json({ isSuccess: false, message: error.message }, { status: error.status });
    }

    // Hash the new password securely
    const hashedNewPassword = await bcrypt.hash(password, 10);

    // Use a Prisma transaction to ensure both operations succeed atomically
    await prisma.$transaction([
      prisma.user.update({ where: { email }, data: { password: hashedNewPassword } }),
      prisma.verificationToken.deleteMany({ where: { identifier: email } }),
    ]);

    // Respond with success message
    return NextResponse.json({ isSuccess: true, message: "Password successfully reset" }, { status: 200 });
  } catch (error) {
    console.error("Error resetting password:", error);
    return NextResponse.json({ isSuccess: false, message: "Internal server error" }, { status: 500 });
  }
}
