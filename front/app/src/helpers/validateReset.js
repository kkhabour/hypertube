import {
    validateEmail,
} from "./validators";

export default function validateReset({
                                           email
                                       }) {
    const errors = {};
    errors.email = validateEmail(email, "Email");
    return errors;
}
