import React, { useState, useContext, useEffect } from "react";
import { Form } from "../index";
import { AuthContext } from "../../context/context";
import { useParams, useHistory } from "react-router-dom";
import { getInstance, imgUrl } from "../../helpers/instance";

export default function User() {
  //// TESTING

  const { auth } = useContext(AuthContext);
  const { id } = useParams();
  const history = useHistory();
  const [data, setData] = useState({
    image: "",
    firstname: "",
    lastname: "",
    username: "",
    language: "",
    watches: "",
    favorite: "",
  });

  useEffect(() => {
    if (auth.token) {
      getInstance(auth.token)
        .get(`/account/${id}`)
        .then((res) => {
          const {
            firstname,
            lastname,
            username,
            image,
            language,
            watches,
            favorite,
          } = res.data.data;
          const t = image.startsWith("https");
          let pic = t ? image : `${imgUrl}${image}`;
          setData((old) => ({
            ...old,
            firstname,
            lastname,
            username,
            image: pic,
            language,
            watches,
            favorite,
          }));
        })
        .catch((e) => {
          history.replace("/");
        });
    }
    // eslint-disable-next-line
  }, [id, auth.token]);
  return (
    <>
      <Form>
        <Form.Title>Information about {data.username}</Form.Title>
        <Form.Base method="POST">
          <Form.Box>
            <label htmlFor="exampleFormControlFile1">
              <Form.Image src={data.image} />
            </label>
          </Form.Box>
          <Form.Text>First Name</Form.Text>
          <Form.Input
            name="firstname"
            placeholder="First Name"
            value={data.firstname}
            disabled
          />
          <Form.Text>Last Name</Form.Text>
          <Form.Input
            name="lastname"
            placeholder="Last Name"
            value={data.lastname}
            disabled
          />
          <Form.Text>Username</Form.Text>
          <Form.Input
            name="username"
            placeholder="Username"
            value={data.username}
            disabled
          />
        </Form.Base>
        <Form.Row>
          <Form.Title>
            <Form.Row>Watches</Form.Row>
            <Form.Row>{data.watches}</Form.Row>
          </Form.Title>

          <Form.Title>
            <Form.Row>Favorite</Form.Row>
            <Form.Row>{data.favorite}</Form.Row>
          </Form.Title>
        </Form.Row>
      </Form>
    </>
  );
}
