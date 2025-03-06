import { AppError } from "./AppError";

export class AuthenticationError extends AppError {
  constructor(message = "Authentication error") {
    super(message, 401);
  }
}
