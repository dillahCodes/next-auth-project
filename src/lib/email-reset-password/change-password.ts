import { ResetPasswordAPIPayload, ResetPasswordAPIResponse } from "@/next-auth";
import { ResetPasswordSchemaType } from "@/schemas/auth-schema";

const changePassword = async (params: ResetPasswordAPIPayload): Promise<ResetPasswordAPIResponse> => {
  const response = await fetch(process.env.BASE_URL + "/api/auth/change-password", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(params),
  });

  const data = await response.json();
  return data as ResetPasswordAPIResponse;
};

export default changePassword;
