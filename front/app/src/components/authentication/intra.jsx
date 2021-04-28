import { useHistory } from "react-router-dom";
import { Instance, imgUrl } from "../../helpers/instance";
import { useEffect, useContext } from "react";
import Message from "../notification";
import { AuthContext } from "../../context/context";

export default function Intra(props) {
  const { setAuth } = useContext(AuthContext);
  const history = useHistory();
  useEffect(() => {
    const code = new URLSearchParams(props.location.search.substring(1)).get(
      "code"
    );

    if (code) {
      Instance.post(`/omniauth/intra/login`, { code })
        .then((res) => {
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
          window.opener.location.reload(true);
          window.close();
        })
        .catch((e) => {
          Message("error", e.response?.message);
          history.push("/signin");
        });
    } else {
      Message("error", "Wrong Params");
      history.push("/signin");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
