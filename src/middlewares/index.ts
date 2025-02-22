import { NextRequest, NextResponse } from "next/server";
import { authMiddleware } from "./auth-middleware";

export async function applyMiddlewares(request: NextRequest) {
  const middlewares = [authMiddleware]; // add more middleware here

  for (const middleware of middlewares) {
    const response = await middleware(request);
    if (response) return response;
  }

  return NextResponse.next();
}
