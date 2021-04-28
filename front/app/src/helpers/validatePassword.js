import {
    validatePassword,
    validateConfirm
} from "./validators";

export default function ValidPassword({
                                           password,
                                           newpassword,
                                           newconfirm

                                       }) {
    const errors = {};

    errors.password = validatePassword(password, "password");
    errors.newpassword = validatePassword(newpassword, "password");
    errors.newconfirm = validateConfirm(newconfirm, newpassword, "confirm");
    return errors;
}