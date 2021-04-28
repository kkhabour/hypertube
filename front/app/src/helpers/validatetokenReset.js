import {
    validatePassword,
    validateConfirm
} from "./validators";

export default function ValidatetokenReset({
                                           password,
                                           confirm

                                       }) {
    const errors = {};

    errors.password = validatePassword(password, "password");
    errors.confirm = validateConfirm(confirm, password, "confirm");
    return errors;
}