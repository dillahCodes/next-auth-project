import { SendForgotPasswordEmailAPIPayload, SendForgotPasswordEmailAPIResponse } from "@/next-auth";

export default async function sendEmailResetPassword(params: SendForgotPasswordEmailAPIPayload) {
  const response = await fetch(process.env.BASE_URL + "/api/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  const data = (await response.json()) as SendForgotPasswordEmailAPIResponse;
  return data;
}
