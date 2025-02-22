import { SendEmailAPIPayload, SendEmailAPIResponse } from "@/next-auth";

const sendEmailVerification = async (payload: SendEmailAPIPayload): Promise<SendEmailAPIResponse> => {
  const response = await fetch(process.env.BASE_URL + "/api/auth/verify-email", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  const data = (await response.json()) as SendEmailAPIResponse;
  return data;
};

export default sendEmailVerification;
