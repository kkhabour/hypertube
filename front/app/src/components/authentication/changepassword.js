import React, { useState, useContext } from "react";
import { Form } from "../index";
import { useHistory } from "react-router-dom";
import useForm from "../../helpers/usefom";
import ValidPassword from "../../helpers/validatePassword";
import { AuthContext } from "../../context/context";
import Message from "../notification";
import { getInstance } from "../../helpers/instance";

export default function Changepassword() {
  //// TESTING
  const [data, setData] = useState({
    password: "",
    newpassword: "",
    newconfirm: "",
  });

  const [formErrors, setFormErrors] = useState({
    password: "",
    newpassword: "",
    newconfirm: "",
  });

  const { handleChange, values, handleSubmit, errors } = useForm(
    submit,
    ValidPassword,
    data,
    setData,
    formErrors,
    setFormErrors
  );

  const { auth } = useContext(AuthContext);

  function submit() {
    if (auth.token) {
      getInstance(auth.token)
        .post(`/account/update/password`, values)
        .then(
          (res) => {
            if (res.data.status === 200) {
              Message("success", res.data.message);
              history.push("/home");
            }
          },
          (error) => {
            Message("error", error.response.data.message);
          }
        );
    }
  }
  var history = useHistory();
  return (
    <>
      <Form.Title>Change Password</Form.Title>
      <Form.Base onSubmit={handleSubmit} method="POST">
        <Form.Input
          name="password"
          type="password"
          value={values.password}
          autoComplete="off"
          placeholder="Old Password"
          onChange={handleChange}
        />
        {errors.password && errors.password && (
          <Form.Para>{errors.password}</Form.Para>
        )}
        <Form.Input
          name="newpassword"
          type="password"
          placeholder="New Password"
          value={values.newpassword}
          onChange={handleChange}
        />
        {errors.newpassword && errors.newpassword && (
          <Form.Para>{errors.newpassword}</Form.Para>
        )}
        <Form.Input
          name="newconfirm"
          type="password"
          value={values.newconfirm}
          autoComplete="off"
          placeholder="Confirm Password"
          onChange={handleChange}
        />
        {errors.newconfirm && errors.newconfirm && (
          <Form.Para>{errors.newconfirm}</Form.Para>
        )}
        <Form.Submit type="submit" data-testid="sign-in">
          Change Password
        </Form.Submit>
      </Form.Base>
    </>
  );
}
