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
import RequestsTable from "../components/RequestsTable";
import { RequestStatus, ReservationRequest } from "../types";
import reservation from "../data";

const NUM_SAMPLE_RESERVATIONS = 4;
const SAMPLE_RESERVATIONS = Array(NUM_SAMPLE_RESERVATIONS).fill(reservation);

export default function Index() {
  const [reservations] = React.useState<ReservationRequest[]>(
    SAMPLE_RESERVATIONS
  );

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
            <RequestsTable
              status={RequestStatus.REQUEST}
              requests={reservations}
            />
          </TabPanel>
          <TabPanel>
            <RequestsTable
              status={RequestStatus.ACCEPTED}
              requests={reservations}
            />
          </TabPanel>
          <TabPanel>
            <RequestsTable
              status={RequestStatus.REJECTED}
              requests={reservations}
            />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <DarkModeSwitch />
    </Container>
  );
}
