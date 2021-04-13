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
import sampleReservations from "../data";

export default function Index() {
  const [reservations, setReservations] = React.useState<ReservationRequest[]>(
    sampleReservations
  );

  function createOnClickHandler(status: RequestStatus) {
    return function onClick(resId: string) {
      setReservations((prevReservations) => {
        return prevReservations.map((res) => {
          if (res.id === resId) {
            return {
              ...res,
              status,
            };
          }

          return res;
        });
      });
    };
  }

  const commonProps = {
    requests: reservations,
    onApproveClick: createOnClickHandler(RequestStatus.ACCEPTED),
    onRejectClick: createOnClickHandler(RequestStatus.REJECTED),
  };

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
            <RequestsTable status={RequestStatus.REQUEST} {...commonProps} />
          </TabPanel>
          <TabPanel>
            <RequestsTable status={RequestStatus.ACCEPTED} {...commonProps} />
          </TabPanel>
          <TabPanel>
            <RequestsTable status={RequestStatus.REJECTED} {...commonProps} />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <DarkModeSwitch />
    </Container>
  );
}
