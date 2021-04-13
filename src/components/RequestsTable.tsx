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
import { CheckCircleIcon } from "@chakra-ui/icons";

interface Props {
  searchValue: string;
  status: RequestStatus;
  requests: ReservationRequest[];
  onApproveClick: (id: string) => void;
  onRejectClick: (id: string) => void;
}

export default function RequestsTable({
  status,
  requests,
  searchValue,
  onApproveClick,
  onRejectClick,
}: Props) {
  const filtered = requests
    .filter((req) => req.status === status)
    .filter((req) =>
      req.guestName.toLowerCase().includes(searchValue.toLowerCase())
    );

  const isPending = status === RequestStatus.REQUEST;

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
                  onApproveClick={() => onApproveClick(request.id)}
                  onRejectClick={() => onRejectClick(request.id)}
                />
              </Td>
            ) : null}
            <Td>
              <DateRange start={request.startDate} end={request.endDate} />
            </Td>
            <Td>
              <GuestName name={request.guestName} />
            </Td>
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

function getColorForStatus(status: RequestStatus) {
  switch (status) {
    case RequestStatus.REQUEST:
      return "request.orange";
    case RequestStatus.ACCEPTED:
      return "request.green";
    case RequestStatus.REJECTED:
      return "request.red";
  }
}

function getTextForStatus(status: RequestStatus) {
  switch (status) {
    case RequestStatus.REQUEST:
      return "Request";
    case RequestStatus.ACCEPTED:
      return "Accepted";
    case RequestStatus.REJECTED:
      return "Rejected";
  }
}

function StatusIndicator({ status }: { status: RequestStatus }) {
  const color = getColorForStatus(status);
  const text = getTextForStatus(status);

  return (
    <HStack>
      <Circle size="8px" bg={color} /> <Text color={color}>{text}</Text>
    </HStack>
  );
}

function GuestName({ name }: { name: string }) {
  return (
    <HStack>
      <Text fontStyle="italic">{name}</Text>
      <CheckCircleIcon color="request.blue" />
    </HStack>
  );
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
