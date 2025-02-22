import { CredentialsSignin } from "next-auth";

type CredentialLoginErrorCode = "INVALID_CREDENTIALS" | "EMAIL_NOT_VERIFIED" | "UNKNOWN_ERROR";

export class BaseAuthError extends CredentialsSignin {
  code: CredentialLoginErrorCode;

  constructor(serverLogName: string, serverLogMessage: string, clientLogErrorCode: CredentialLoginErrorCode) {
    super(serverLogMessage);
    this.name = serverLogName;
    this.message = serverLogMessage;
    this.code = clientLogErrorCode;
    this.type = "CredentialsSignin";
    this.stack = undefined; // Remove stack for clean log in server
  }
}

export class MissingEmailOrPasswordError extends BaseAuthError {
  constructor() {
    super("MISSING_EMAIL_OR_PASSWORD", "Missing Email or Password", "INVALID_CREDENTIALS");
  }
}

export class UserNotFoundError extends BaseAuthError {
  constructor(email: string) {
    super("USER_NOT_FOUND", `User ${email} not found`, "INVALID_CREDENTIALS");
  }
}

export class LoginWrongPassword extends BaseAuthError {
  constructor(email: string) {
    super("WRONG_PASSWORD", `Login with ${email} failed, the password is incorrect`, "INVALID_CREDENTIALS");
  }
}

export class EmailNotVerifiedError extends BaseAuthError {
  constructor(email: string) {
    super("EMAIL_NOT_VERIFIED", `Email ${email} not verified`, "EMAIL_NOT_VERIFIED");
  }
}
