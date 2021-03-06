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
  HStack,
  Button,
  Heading,
} from "@chakra-ui/react";
import { removeLeadingZeros, pluralize } from "../util";
import { RequestStatus, ReservationRequest } from "../types";
import { CheckCircleIcon } from "@chakra-ui/icons";
import StatusIndicator from "./StatusIndicator";

interface Props {
  searchValue: string;
  status: RequestStatus;
  requests: ReservationRequest[];
  onApproveClick: (id: string) => void;
  onRejectClick: (id: string) => void;
  onDetailsClick: (id: string) => void;
}

export default function RequestsTable({
  status,
  requests,
  searchValue,
  onDetailsClick,
  onApproveClick,
  onRejectClick,
}: Props) {
  const results = requests.filter((req) => req.status === status);
  const numResults = results.length;
  const filtered = results.filter((req) =>
    req.guestName.toLowerCase().includes(searchValue.toLowerCase())
  );

  const isPending = status === RequestStatus.REQUEST;

  return (
    <VStack align="start">
      <Heading as="h3" size="40px" paddingLeft="var(--chakra-space-5)">
        {pluralize(`${numResults} Request`, numResults)}
      </Heading>
      <Table variant="simple">
        <Thead>
          <Tr>
            <Th>Status</Th>
            {isPending ? <Th>Accept / Reject</Th> : null}
            <Th>When</Th>
            <Th>Guest</Th>
            <Th>Type of Room</Th>
            <Th>Payout</Th>
            <Th />
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
              <Td>${request.payout.toFixed(2)}</Td>
              <Td>
                <DetailsButton onClick={() => onDetailsClick(request.id)} />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
    </VStack>
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

function GuestName({ name }: { name: string }) {
  return (
    <HStack>
      <Text fontStyle="italic">{name}</Text>
      <CheckCircleIcon color="request.blue" />
    </HStack>
  );
}

function DateRange({ start, end }: { start: string; end: string }) {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const [, startMonth, startDay] = startDate.toDateString().split(" ");
  const [, endMonth, endDay] = endDate.toDateString().split(" ");

  return (
    <Text fontStyle="italic">
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
      <Text>{pluralize(`${numRooms} Room`, numRooms)}</Text>
      <Text size="sm" fontStyle="italic" color="gray.500">
        {listingType}
      </Text>
    </VStack>
  );
}

function DetailsButton({ onClick }: { onClick: () => void }) {
  return (
    <Button width="75px" variant="outline" onClick={onClick}>
      <Text fontSize="15px" fontStyle="italic">
        Details
      </Text>
    </Button>
  );
}
