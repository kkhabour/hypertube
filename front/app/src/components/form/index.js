import React from "react";
import {
  Container,
  Error,
  Base,
  Title,
  Text,
  TextSmall,
  Link,
  Input,
  Submit,
  Row,
  Omniauth,
  Box,
  Image,
  Para,
  Label
} from "./styles/form";

export default function Form({ children, ...restProps }) {
  return <Container {...restProps}>{children}</Container>;
}

Form.Box = function FormBox({ children, ...restProps }) {
  return <Box {...restProps}>{children}</Box>;
};

Form.Image = function FormImage({ children, ...restProps }) {
  return <Image {...restProps}>{children}</Image>;
};

Form.Error = function FormError({ children, ...restProps }) {
  return <Error {...restProps}>{children}</Error>;
};

Form.Base = function FormBase({ children, ...restProps }) {
  return <Base {...restProps}>{children}</Base>;
};

Form.Title = function FormTitle({ children, ...restProps }) {
  return <Title {...restProps}>{children}</Title>;
};

Form.Text = function FormText({ children, ...restProps }) {
  return <Text {...restProps}>{children}</Text>;
};

Form.TextSmall = function FormTextSmall({ children, ...restProps }) {
  return <TextSmall {...restProps}>{children}</TextSmall>;
};

Form.Link = function FormLink({ children, ...restProps }) {
  return <Link {...restProps}>{children}</Link>;
};

Form.Input = function FormInput({ children, ...restProps }) {
  return <Input {...restProps}>{children}</Input>;
};

Form.Submit = function FormSubmit({ children, ...restProps }) {
  return <Submit {...restProps}>{children}</Submit>;
};

Form.Omniauth = function FormOmniauth({ children, ...restProps }) {
  return <Omniauth {...restProps}>{children}</Omniauth>;
};

Form.Row = function FormRow({ children, ...restProps }) {
  return <Row {...restProps}>{children}</Row>;
};

Form.Para = function FormRow({ children, ...restProps }) {
  return <Para {...restProps}>{children}</Para>;
};

Form.InputImage = function FormInputImage({ children, ...restProps }) {
  return <Input type="file" id="img" name="img" accept="image/*"></Input>;
};

Form.Label = function FormLabel({ children, ...restProps }) {
  return <Label {...restProps}>{children}</Label>;
};