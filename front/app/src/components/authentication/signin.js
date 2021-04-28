import React, { useContext, useState, useEffect } from "react";
import { Form } from "../index";
import { FiGithub } from "react-icons/fi";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../context/context";
import useForm from "../../helpers/usefom";
import validateSignIn from "../../helpers/validateSignin";
import Message from "../notification";
import { Instance, urlGithub, urlIntra, imgUrl } from "../../helpers/instance";

export default function Signin() {
  const { setAuth } = useContext(AuthContext);
  const [data, setData] = useState({
    username: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({
    username: "",
    password: "",
  });
  const { handleChange, values, handleSubmit, errors } = useForm(
    submit,
    validateSignIn,
    data,
    setData,
    formErrors,
    setFormErrors
  );

  let history = useHistory();
  function submit() {
    Instance.post("/auth/login", data).then(
      (res) => {
        if (res.data.status === 200) {
          const {
            token,
            message,
            data: { language, image },
          } = res.data;

          const t = image.startsWith("https");
          let pic = t ? image : `${imgUrl}${image}`;
          try {
            localStorage.setItem("token", token);
            localStorage.setItem("language", language);
          } catch (error) {
            return;
          }
          setAuth({ language, image: pic, token });
          history.push("/");
          Message("success", message);
        }
      },
      (error) => {
        if (error.response) Message("error", error.response?.data.message);
        else Message("error", "Undefined Error");
      }
    );
  }
  useEffect(() => {
    document.title = "HyperTube | Signin ";
  });
  return (
    <>
      {/* <HeaderContainer /> */}
      <Form>
        <Form.Title>Sign In</Form.Title>
        <Form.Base onSubmit={handleSubmit} method="POST">
          <Form.Input
            type="text"
            placeholder="Username"
            name="username"
            value={data.username}
            onChange={handleChange}
          />
          {errors.username && errors.username && (
            <Form.Para>{errors.username}</Form.Para>
          )}
          <Form.Input
            type="password"
            name="password"
            value={values.password}
            autoComplete="off"
            placeholder="Password"
            onChange={handleChange}
          />
          {errors.password && errors.password && (
            <Form.Para>{errors.password}</Form.Para>
          )}
          <Form.Submit type="submit" data-testid="sign-in">
            Sign In
          </Form.Submit>
        </Form.Base>
        <Form.Text>
          New to Hypertube? <Form.Link to="/signup">Sign up now.</Form.Link>
        </Form.Text>
        <Form.Text>
          Forgot password? <Form.Link to="/forgot">Forgot.</Form.Link>
        </Form.Text>
        <Form.Omniauth onClick={() => window.open(urlIntra)}>
          <Gr42school />
        </Form.Omniauth>
        <Form.Omniauth onClick={() => window.open(urlGithub)}>
          <FiGithub />
        </Form.Omniauth>
      </Form>
    </>
  );
}
function Gr42school() {
  return (
    <>
      <img
        style={{ width: "1em", height: "1em" }}
        src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/42_Logo.svg/512px-42_Logo.svg.png"
        alt="42"
      />
    </>
  );
}
