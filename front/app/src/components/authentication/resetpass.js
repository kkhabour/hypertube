import React, { useState } from "react";
import { Form } from "../index";
import { useHistory, useParams } from "react-router-dom";
import useForm from "../../helpers/usefom";
import ValidatetokenReset from "../../helpers/validatetokenReset";
import Message from "../notification";
import { Instance } from "../../helpers/instance";

export default function Reset() {
  //// TESTING
  // Get Token from url
  const { token } = useParams();

  const [data, setData] = useState({
    token,
    password: "",
    confirm: "",
  });

  const [formErrors, setFormErrors] = useState({
    password: "",
    confirm: "",
  });

  const { handleChange, values, handleSubmit, errors } = useForm(
    submit,
    ValidatetokenReset,
    data,
    setData,
    formErrors,
    setFormErrors
  );

  function submit() {
    Instance.post(`/confirm/password`, values).then(
      (res) => {
        if (res.data.status === 200) {
          Message("success", res.data.message);
          history.push("/signin");
        }
      },
      (error) => {
        Message("error", error.response.data.message);
        history.push("/signin");
      }
    );
  }

  var history = useHistory();

  return (
    <>
        <Form>
          <Form.Title>Reset Password</Form.Title>
          <Form.Base onSubmit={handleSubmit} method="POST">
            <Form.Input
              name="password"
              type="password"
              value={values.password}
              autoComplete="off"
              placeholder="New Password"
              onChange={handleChange}
            />
            {errors.password && errors.password && (
              <Form.Para>{errors.password}</Form.Para>
            )}
            <Form.Input
              name="confirm"
              type="password"
              value={values.confirm}
              autoComplete="off"
              placeholder="Confirm Password"
              onChange={handleChange}
            />
            {errors.confirm && errors.confirm && (
              <Form.Para>{errors.confirm}</Form.Para>
            )}
            <Form.Submit type="submit" data-testid="sign-in">
              Change Password
            </Form.Submit>
          </Form.Base>
        </Form>
    </>
  );
}
