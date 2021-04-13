import * as React from "react";
import { Text, Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { RequestStatus, ReservationRequest } from "../types";

interface Props {
  status: RequestStatus;
  requests: ReservationRequest[];
}

export default function RequestsTable({ status, requests }: Props) {
  const filtered = requests.filter((req) => req.status === status);
  const isPending = status === RequestStatus.REQUEST;

  if (filtered.length === 0) {
    return <Text>No requests found</Text>;
  }

  return (
    <Table variant="simple">
      <Thead>
        <Tr>
          <Th>Status</Th>
          {isPending ? <Th>Accept / Reject</Th> : null}
          <Th>When</Th>
          <Th>Guest</Th>
          <Th>Type of Room</Th>
          <Th>Payout</Th>
        </Tr>
      </Thead>
      <Tbody>
        {filtered.map((request, index) => (
          <Tr key={index}>
            <Td>{request.status}</Td>
            {isPending ? <Td>Button</Td> : null}
            <Td>
              {request.startDate} - {request.endDate}
            </Td>
            <Td>{request.guestName}</Td>
            <Td>
              {request.rooms} Rooms - {request.listingType}
            </Td>
            <Td>{request.payout}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}
