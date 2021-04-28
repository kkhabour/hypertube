import React, { useEffect } from "react";
// import { makeStyles } from "@material-ui/core";
import { Form } from '../components/index';

export default function NotFound() {
  // const classes = useStyles();
  useEffect(() => {
    const timer = setTimeout(() => {
      window.location.replace("/");
    }, 2000);
    return () => clearTimeout(timer);
  }, []);
  return (
    
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        height: "90vh",
        backgroundImage: `url("/images/wallpaper.jpg")`,
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
        backgroundSize: "auto 100%",
      }}
    >
      <Form.Title>
        NOT FOUND
      </Form.Title>
    </div>
  )
}