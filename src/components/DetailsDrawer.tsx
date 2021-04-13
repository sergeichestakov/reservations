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
} from "@chakra-ui/react";
import { RequestStatus, ReservationRequest } from "../types";
import StatusIndicator from "./StatusIndicator";
import { formatPhoneNumber, pluralize } from "../util";

interface Props {
  reservation: ReservationRequest | undefined;
  onClose(): void;
}

export default function DetailsDrawer({ onClose, reservation }: Props) {
  return (
    <Drawer isOpen={Boolean(reservation)} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />

          <DrawerBody>
            <HStack paddingTop="30px" justifyContent="space-between">
              <Heading as="h5" size="sm">
                Reservation Details
              </Heading>
              <StatusIndicator status={reservation?.status as RequestStatus} />
            </HStack>
            <HStack width="272px" height="180px" overflow="hidden" margin="0">
              <Image
                src="/reservation.jpg"
                display="block"
                width="100%"
                alt={reservation?.listingType || "reservation"}
              />
            </HStack>
            <HStack justifyContent="space-between">
              <HStack>
                <Avatar
                  src={reservation?.profilePicture}
                  name={reservation?.guestName}
                />
                <Text>{reservation?.guestName}</Text>
              </HStack>
              <VStack spacing={0.25} alignItems="start">
                <Text fontSize="xs" fontWeight="hairline">
                  Guest number
                </Text>
                <Text>{formatPhoneNumber(reservation?.guestNumber || "")}</Text>
              </VStack>
            </HStack>
            <Box fontSize="12px">
              <Heading as="h5" size="sm">
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
                  value={reservation?.startDate || ""}
                />
                <BookingDetail
                  label="Check-out"
                  value={reservation?.endDate || ""}
                />
              </VStack>
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
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
      height="60px"
      width="100%"
      borderBottom="1px solid #E4E4E4"
      justifyContent="space-between"
    >
      <Text>{label}</Text>
      <Text>{value}</Text>
    </HStack>
  );
}
