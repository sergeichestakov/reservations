import * as React from "react";
import { Heading } from "@chakra-ui/react";
import Container from "../components/Container";
import DarkModeSwitch from "../components/DarkModeSwitch";
import SearchBar from "../components/SearchBar";

export default function Index() {
  return (
    <Container height="100vh">
      <Heading as="h4" size="md">
        Requests & Reservations
      </Heading>
      <SearchBar />
      <DarkModeSwitch />
    </Container>
  );
}
