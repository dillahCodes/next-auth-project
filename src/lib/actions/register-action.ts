import { RegisterAPIResponse } from "@/next-auth";
import { RegisterSchemaType } from "@/schemas/auth-schema";

/**
 * Register a new user with email and password.
 * @param {RegisterSchemaType} data - The registration data containing email, password, and other details.
 * @returns {Promise<RegisterAPIResponse>} - The response from the server.
 */
export const RegisterWithCredentials = async (data: RegisterSchemaType) => {
  const response = await fetch(process.env.BASE_URL + "/api/auth/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  // Parse the response from the server and return the result
  const result = await response.json();
  return result as RegisterAPIResponse;
};
