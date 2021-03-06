import * as React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerBody,
  DrawerContent,
  Heading,
  Image,
  HStack,
  Avatar,
  Text,
  VStack,
  Box,
  AvatarBadge,
} from "@chakra-ui/react";
import { RequestStatus, ReservationRequest } from "../types";
import StatusIndicator from "./StatusIndicator";
import { formatPhoneNumber, pluralize, removeLeadingZeros } from "../util";
import { CheckCircleIcon } from "@chakra-ui/icons";

const ONE_DAY = 86400000;

interface Props {
  reservation: ReservationRequest | undefined;
  onClose(): void;
}

export default function DetailsDrawer({ onClose, reservation }: Props) {
  const numDays = getStayLengthInDays(
    reservation?.startDate || "",
    reservation?.endDate || ""
  );
  const payout = reservation?.payout || 0;
  const payoutPerDay = payout / numDays;
  const serviceFeePercentage = (reservation?.serviceFeePercentage || 0) / 100;
  const serviceFee = payout * serviceFeePercentage;

  return (
    <Drawer isOpen={Boolean(reservation)} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody fontFamily="Abel">
            <HStack
              paddingTop="35px"
              paddingBottom="10px"
              justifyContent="space-between"
            >
              <Heading as="h5" size="sm" fontWeight="normal">
                Reservation details
              </Heading>
              <StatusIndicator
                status={reservation?.status as RequestStatus}
                fontStyle="normal"
                circleSize="6px"
                fontSize="15px"
              />
            </HStack>
            <HStack width="272px" height="180px" overflow="hidden" margin="0">
              <Image
                src="/reservation.jpg"
                display="block"
                width="100%"
                alt={reservation?.listingType || "reservation"}
              />
            </HStack>
            <HStack justifyContent="space-between" paddingTop="15px">
              <HStack>
                <Avatar
                  src={reservation?.profilePicture}
                  name={reservation?.guestName}
                  size="sm"
                >
                  <AvatarBadge>
                    <CheckCircleIcon color="request.blue" />
                  </AvatarBadge>
                </Avatar>
                <Text>{reservation?.guestName}</Text>
              </HStack>
              <VStack spacing={0.25} alignItems="start">
                <Text fontSize="xs" fontWeight="hairline">
                  Guest number
                </Text>
                <Text fontSize="14px">
                  {formatPhoneNumber(reservation?.guestNumber || "")}
                </Text>
              </VStack>
            </HStack>
            <Box fontSize="12px" paddingTop="30px">
              <Heading as="h5" size="sm" fontWeight="normal">
                Booking Details
              </Heading>
              <VStack>
                <BookingDetail
                  label="Room type"
                  value={reservation?.listingType || ""}
                />
                <BookingDetail
                  label="Number of rooms"
                  value={reservation?.rooms || 1}
                />
                <BookingDetail
                  label="Guests"
                  value={pluralize(
                    `${reservation?.numberOfGuests} Guest`,
                    reservation?.numberOfGuests || 0
                  )}
                />
                <BookingDetail
                  label="Check-in"
                  value={formatDateTime(
                    reservation?.startDate || "",
                    reservation?.startTime || ""
                  )}
                />
                <BookingDetail
                  label="Check-out"
                  value={formatDateTime(
                    reservation?.endDate || "",
                    reservation?.endTime || ""
                  )}
                />
              </VStack>
              <VStack paddingTop="25px">
                <Summary
                  label="Payout"
                  light
                  value={`Rate: $${payoutPerDay.toFixed(2)} per day`}
                />
                <Summary
                  label={`${pluralize(`${numDays} Day`, numDays)}`}
                  value={`$${(reservation?.payout || 0).toFixed(2)}`}
                />
                <Summary
                  label={`Service Fee (${reservation?.serviceFeePercentage}%)`}
                  value={`-$${serviceFee.toFixed(2)}`}
                />
                <Summary
                  label="Total (USD)"
                  value={`$${(payout + serviceFee).toFixed(2)}`}
                />
              </VStack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}

function Summary({
  label,
  value,
  light,
}: {
  label: string;
  value: string;
  light?: boolean;
}) {
  return (
    <HStack
      height="20px"
      width="100%"
      justifyContent="space-between"
      paddingTop="15px"
    >
      <Text>{label}</Text>
      <Text fontWeight={light ? "hairline" : "normal"}>{value}</Text>
    </HStack>
  );
}

function BookingDetail({
  label,
  value,
}: {
  label: string;
  value: string | number;
}) {
  return (
    <HStack
      height="40px"
      width="100%"
      borderBottom="1px solid #E4E4E4"
      justifyContent="space-between"
    >
      <Text>{label}</Text>
      <Text>{value}</Text>
    </HStack>
  );
}

function formatDateTime(dateStr: string, time: string) {
  const date = new Date(dateStr);

  const [dayOfTheWeek, month, day] = date.toDateString().split(" ");

  return `${dayOfTheWeek} ${month} ${removeLeadingZeros(day || "")} @ ${time}`;
}

function getStayLengthInDays(start: string, end: string) {
  const startDate = new Date(start);
  const endDate = new Date(end);

  return Math.round((endDate.valueOf() - startDate.valueOf()) / ONE_DAY);
}
