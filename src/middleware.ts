import { NextRequest } from "next/server";
import { applyMiddlewares } from "./middlewares/index";

export async function middleware(request: NextRequest) {
  return applyMiddlewares(request);
}

export const config = {
  matcher: "/:path*",
};
