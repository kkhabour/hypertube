import { validatePassword, validateUser } from "./validators";

export default function validateSignIn({ username, password }) {
  const errors = {};

  errors.username = validateUser(username, "username");
  errors.password = validatePassword(password, "password");
  return errors;
}
