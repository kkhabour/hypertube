import {
    validateStr,
    validateEmail,
    validateUser,
    validatePassword,
} from "./validators";

export default function validateUpdateinfo({
                                           firstname,
                                           lastname,
                                           username,
                                           email,
                                           password,
                                           type
                                       }) {
                                        
    const errors = {};
    errors.firstname = validateStr(firstname, "First Name");
    errors.lastname = validateStr(lastname, "Last Name");
    errors.email = validateEmail(email, "Email");
    errors.username = validateUser(username, "Username");
    if (type === 'LOCAL')
        errors.password = validatePassword(password, "password");
    return errors;
}
