import {
    validateStr,
    validateEmail,
    validateUser,
    validatePassword,
    validateConfirm,
} from "./validators";

export default function validateSignUp({
                                           firstname,
                                           lastname,
                                           username,
                                           email,
                                           password,
                                           confirm,
                                       }) {
    const errors = {};

    errors.firstname = validateStr(firstname, "First Name");
    errors.lastname = validateStr(lastname, "Last Name");
    errors.email = validateEmail(email, "Email");
    errors.username = validateUser(username, "Username");
    errors.password = validatePassword(password, "password");
    errors.confirm = validateConfirm(confirm, password, "confirm");
    return errors;
}
