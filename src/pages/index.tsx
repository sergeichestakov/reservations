import * as React from "react";
import { Text } from "@chakra-ui/react";
import Container from "../components/Container";
import DarkModeSwitch from "../components/DarkModeSwitch";

export default function Index() {
  return (
    <Container height="100vh">
      <Text>Welcome to Globe</Text>
      <DarkModeSwitch />
    </Container>
  );
}
