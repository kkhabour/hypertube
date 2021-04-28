import { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import Message from "../notification";
import { Instance } from "../../helpers/instance";

function Confirm() {
  const { token } = useParams();
  const history = useHistory();
  useEffect(() => {
    Instance.post("/confirm/email", { token })
      .then((res) => {
        const { message } = res.data;
        Message("success", message);
        history.push("/signin");
      })
      .catch((e) => {
        if (e) {
          Message("error", e?.response?.data.message);
          history.push("/signin");
        }
      });
  }, [token, history]);

  return null;
}

export default Confirm;
