import React, { useContext } from "react";
import { Header } from "../components";
import logo from "../hypertube.png";
import LogoutIcon from "@material-ui/icons/ExitToApp";
import { Avatar, Button } from "@material-ui/core";
import MovieIcon from "@material-ui/icons/Movie";
import { IsLoggedfn, AuthContext } from "../context/context";
import { useHistory } from "react-router-dom";

export function HeaderContainer() {
  const { setAuth } = useContext(AuthContext);
  const history = useHistory();

  const LogoutFn = () => {
    setAuth({ token: "" });
    localStorage.clear();
    history.go("/signin");

    const channel = new BroadcastChannel("logout");
    channel.postMessage("log out now");
  };
  const isLogged = IsLoggedfn();
  if (isLogged) return <Logged LogoutFn={LogoutFn} />;
  else return <NotLogged />;
}

function NotLogged() {
  return (
    <Header>
      <Header.Frame>
        <Header.Logo
          onClick={() => {
            window.location.href = "/";
          }}
          src={logo}
          alt="Hypertube"
        />
        <Header.ButtonLink to="/Signup">SignUp</Header.ButtonLink>
      </Header.Frame>
    </Header>
  );
}

function Logged({ LogoutFn }) {
  const history = useHistory();
  const { auth } = useContext(AuthContext);
  // const t = auth.image.startsWith("https");
  return (
    <Header>
      <Header.Frame>
        <Header.Logo
          onClick={() => {
            window.location.href = "/";
          }}
          src={logo}
          alt="Hypertube"
        />

        <div style={{ display: "flex" }}>
          <Button onClick={() => history.push("/watchlist")}>
            <i>
              <MovieIcon style={{ color: "#dc1b28" }} />
            </i>
          </Button>

          <Avatar
            style={{ cursor: "pointer" }}
            onClick={() => {
              history.push("/updatedata");
            }}
            src={auth.image}
          />
          <Button onClick={() => LogoutFn()}>
            <i>
              <LogoutIcon style={{ color: "#dc1b28" }} />
            </i>
          </Button>
        </div>
      </Header.Frame>
    </Header>
  );
}
