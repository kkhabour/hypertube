import React from "react";
import { Container, ButtonLink, Logo } from "./styles/header";

export default function Header({ bg = true, children, ...restProps }) {
  return children;
}

Header.Frame = function HeaderFrame({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
};

Header.Logo = function HeaderLogo({ ...restProps }) {
  return (
    <>
      <Logo {...restProps} />
    </>
  );
};

Header.ButtonLink = function HeaderButtonLink({ children, ...restProps }) {
  return <ButtonLink {...restProps}>{children}</ButtonLink>;
};
