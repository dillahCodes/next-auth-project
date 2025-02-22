import { NextRequest } from "next/server";
import { applyMiddlewares } from "./middlewares/index";

export async function middleware(request: NextRequest) {
  return applyMiddlewares(request);
}

// Atur agar middleware berjalan di semua route
export const config = {
  matcher: "/:path*",
};
