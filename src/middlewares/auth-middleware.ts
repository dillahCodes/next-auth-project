import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/user-info"];

/**
 * Middleware function to handle authentication for incoming requests.
 *
 * This middleware checks if the user session is valid, not expired, and the user's email is verified.
 * If the request is for a protected route and the user is not authenticated, it redirects to the login page.
 * Otherwise, it allows the request to proceed.
 *
 * @param {NextRequest} request - The incoming request object.
 * @returns {Promise<NextResponse>} - A promise that resolves to the response object, either redirecting to login or allowing the request to proceed.
 */
export async function authMiddleware(request: NextRequest) {
  const session = await auth();
  const isSessionExpired = session?.expires ? new Date(session.expires) < new Date() : true;
  const isUserVerified = !!(session?.user.emailVerified ?? null);
  const isNotAuth = !session?.user || isSessionExpired || !isUserVerified;

  return protectedRoutes.some((route) => request.nextUrl.pathname.startsWith(route)) && isNotAuth
    ? NextResponse.redirect(new URL("/login", request.url))
    : NextResponse.next();
}
