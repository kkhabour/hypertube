import React, { useState, useEffect } from "react";
import { Form } from "../index";
import useForm from "../../helpers/usefom";
import validateSignIn from "../../helpers/validateReset";
import Message from "../notification";
import { Instance } from "../../helpers/instance";

export default function Forgot() {
  const [data, setData] = useState({
    email: "",
  });

  const [formErrors, setFormErrors] = useState({
    email: "",
  });

  const { handleChange, values, handleSubmit, errors } = useForm(
    submit,
    validateSignIn,
    data,
    setData,
    formErrors,
    setFormErrors
  );

  function submit() {
    Instance.post(`/auth/reset`, values).then(
      (res) => {
        if (res.data.status === 200) {
          Message("success", res.data.message);
        }
      },
      (error) => {
        Message("error", error.response.data.message);
      }
    );
  }
  useEffect(() => {
    document.title = "HyperTube | Reset ";
  });
  return (
    <>
        <Form>
          <Form.Title>Reset</Form.Title>
          <Form.Base onSubmit={handleSubmit} method="POST">
            <Form.Input
              name="email"
              type="email"
              placeholder="Email address"
              value={data.email}
              onChange={handleChange}
            />
            {errors.email && errors.email && (
              <Form.Para>{errors.email}</Form.Para>
            )}
            <Form.Submit type="submit" data-testid="sign-in">
              Reset
            </Form.Submit>
          </Form.Base>
          <Form.Text>
            Have an account? <Form.Link to="/signin">Sign in now.</Form.Link>
          </Form.Text>
        </Form>
    </>
  );
}
