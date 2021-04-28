import React, { useState, createContext, useEffect, useContext } from "react";
import { getInstance, imgUrl } from "../helpers/instance";

export const AuthContext = createContext();
let token;
try {
  token = localStorage?.getItem("token");
} catch (error) {
  token = "";
}
export function AuthProvider(props) {
  const [auth, setAuth] = useState({
    token,
    image: "",
    language: "",
  });

  useEffect(() => {
    if (token) {
      const isValid = () => {
        getInstance(token)
          .get("/account/me")
          .then((res) => {
            const { image, language } = res.data.user;
            const t = image.startsWith("https");
            let pic = t ? image : `${imgUrl}${image}`;
            setAuth((oldValue) => ({
              ...oldValue,
              token,
              image: pic,
              language,
            }));
          })
          .catch((e) => {
            localStorage.clear();
            setAuth((oldValue) => {
              return { ...oldValue, token: null };
            });
          });
      };
      isValid();
    } else {
      setAuth((oldValue) => {
        return { ...oldValue, token: "" };
      });
      // localStorage.clear();
    }
  }, []);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
}

export const IsLoggedfn = () => {
  const {
    auth: { token },
  } = useContext(AuthContext);
  return token;
};

export default AuthProvider;
