// import React, { useContext } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {
  Signin,
  Signup,
  Forgot,
  Confirm,
  Updatedata,
  Reset,
  User,
  Intra,
  Github,
} from "./pages";
import { HeaderContainer } from "./containers/header";
import { FooterContainer } from "./containers/footer";
import { AuthProvider, IsLoggedfn } from "./context/context";
import { AuthContext } from "./context/context";
import { useContext } from "react";
import Library from "./pages/Library";
import Movie from "./pages/movie";
import Watchlist from "./pages/Watchlist";
import NotFound from "./pages/NotFound";

function App() {
  const isAuthenticated = IsLoggedfn();
  const channel = new BroadcastChannel("logout");
  const { setAuth } = useContext(AuthContext);

  channel.addEventListener("message", (event) => {
    setAuth("");
    localStorage.clear();
  });

  return (
    <Router>
      <HeaderContainer />
      <Switch>
        <Route
          exact
          path="/confirm/:token"
          component={!isAuthenticated ? Confirm : Library}
        />
        <Route
          exact
          path="/reset/:token"
          component={!isAuthenticated ? Reset : Library}
        />
        <Route
          exact
          path="/omniauth/intra"
          component={!isAuthenticated ? Intra : Library}
        />
        <Route
          exact
          path="/omniauth/github"
          component={!isAuthenticated ? Github : Library}
        />

        <Route
          path="/watchlist"
          render={(props) => {
            if (isAuthenticated) {
              if (typeof isAuthenticated === "string") return <Watchlist />;
            } else return <Signin />;
          }}
        />
        <Route
          path="/updatedata"
          render={(props) => {
            if (isAuthenticated) {
              if (typeof isAuthenticated === "string") return <Updatedata />;
            } else return <Signin />;
          }}
        />
        <Route
          path="/user/:id"
          render={(props) => {
            if (isAuthenticated) {
              if (typeof isAuthenticated === "string") return <User />;
              else return <Signin />;
            }
          }}
        />
        <Route
          path="/movie/:id"
          render={(props) => {
            if (isAuthenticated) {
              if (typeof isAuthenticated === "string") return <Movie />;
            } else return <Signin />;
          }}
        />
        <Route path="/signin" component={!isAuthenticated ? Signin : Library} />
        <Route path="/signup" component={!isAuthenticated ? Signup : Library} />
        <Route path="/forgot" component={!isAuthenticated ? Forgot : Library} />
        <Route
          exact
          path="/"
          render={(props) => {
            if (isAuthenticated) {
              if (typeof isAuthenticated === "string") return <Library />;
            } else return <Signin />;
          }}
        />
        <Route path="*" component={NotFound} />
      </Switch>
      <FooterContainer />
    </Router>
  );
}

function AppWithStore() {
  return (
    <AuthProvider>
      <App />
    </AuthProvider>
  );
}
export default AppWithStore;
