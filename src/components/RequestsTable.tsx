import * as React from "react";
import {
  Text,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  VStack,
  Circle,
  HStack,
  Button,
} from "@chakra-ui/react";
import { RequestStatus, ReservationRequest } from "../types";

interface Props {
  status: RequestStatus;
  requests: ReservationRequest[];
  onApproveClick: (index: number) => void;
  onRejectClick: (index: number) => void;
}

export default function RequestsTable({
  status,
  requests,
  onApproveClick,
  onRejectClick,
}: Props) {
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
            <Td>
              <StatusIndicator status={request.status as RequestStatus} />
            </Td>
            {isPending ? (
              <Td>
                <AcceptRejectButtons
                  onApproveClick={() => onApproveClick(index)}
                  onRejectClick={() => onRejectClick(index)}
                />
              </Td>
            ) : null}
            <Td>
              <DateRange start={request.startDate} end={request.endDate} />
            </Td>
            <Td>{request.guestName}</Td>
            <Td>
              <RoomDescription
                numRooms={request.rooms}
                listingType={request.listingType}
              />
            </Td>
            <Td>${request.payout}.00</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
}

function AcceptRejectButtons({
  onApproveClick,
  onRejectClick,
}: {
  onApproveClick: () => void;
  onRejectClick: () => void;
}) {
  return (
    <HStack>
      <Button
        width="75px"
        colorScheme="green"
        variant="outline"
        onClick={onApproveClick}
      >
        <Text fontSize="15px" fontStyle="italic">
          Approve
        </Text>
      </Button>
      <Button
        width="70px"
        colorScheme="red"
        variant="outline"
        onClick={onRejectClick}
      >
        <Text fontSize="15px" fontStyle="italic">
          Reject
        </Text>
      </Button>
    </HStack>
  );
}

function StatusIndicator({ status }: { status: RequestStatus }) {
  switch (status) {
    case RequestStatus.REQUEST: {
      return (
        <HStack>
          <Circle size="8px" bg="orange" /> <Text color="orange">Request</Text>
        </HStack>
      );
    }
    case RequestStatus.ACCEPTED: {
      return (
        <HStack>
          <Circle size="8px" bg="green" /> <Text color="green">Accepted</Text>
        </HStack>
      );
    }
    case RequestStatus.REJECTED: {
      return (
        <HStack>
          <Circle size="8px" bg="red" /> <Text color="red">Rejected</Text>
        </HStack>
      );
    }
    default: {
      throw new Error(`Received unexpected status: ${status}`);
    }
  }
}

const removeLeadingZeros = (strNumber: string) => strNumber.replace(/^0+/, "");

function DateRange({ start, end }: { start: string; end: string }) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const [, startMonth, startDay] = startDate.toDateString().split(" ");
  const [, endMonth, endDay] = endDate.toDateString().split(" ");

  return (
    <Text>
      {startMonth} {removeLeadingZeros(startDay)} - {endMonth}{" "}
      {removeLeadingZeros(endDay)}
    </Text>
  );
}

function RoomDescription({
  numRooms,
  listingType,
}: {
  numRooms: number;
  listingType: string;
}) {
  return (
    <VStack spacing={1}>
      <Text>{numRooms} Rooms</Text>
      <Text size="sm" fontStyle="italic" color="gray.500">
        {listingType}
      </Text>
    </VStack>
  );
}
