import * as React from "react";
import {
  Heading,
  TabList,
  TabPanels,
  TabPanel,
  Tabs,
  Tab,
} from "@chakra-ui/react";
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
      <Tabs>
        <TabList>
          <Tab>Requests</Tab>
          <Tab>Accepted</Tab>
          <Tab>Rejected</Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <p>Requests</p>
          </TabPanel>
          <TabPanel>
            <p>Accepted</p>
          </TabPanel>
          <TabPanel>
            <p>Rejected</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
      <DarkModeSwitch />
    </Container>
  );
}
