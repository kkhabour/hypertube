import React, { useState } from "react";
import { Form } from "../index";
import Changepassword from "./changepassword";
import Update from "./updateinfo";

export default function Updatedata() {
  //// TESTING

  const [toggle, setToggle] = useState(true);

  return (
    <>
        <Form>
          {toggle ? <Update /> : <Changepassword />}
          <Form.Row>
            <Form.Submit onClick={() => setToggle(true)}>
              Update information
            </Form.Submit>
            <Form.Submit onClick={() => setToggle(false)}>
              Change Password
            </Form.Submit>
          </Form.Row>
        </Form>
    </>
  );
}
