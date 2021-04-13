import * as React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerBody,
  DrawerContent,
  Heading,
  Box,
  Image,
} from "@chakra-ui/react";
import { ReservationRequest } from "../types";

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
            <Heading as="h5" size="sm" paddingTop="30px">
              Reservation Details
            </Heading>
            <Box>
              <Image
                src="/reservation.jpg"
                alt={reservation?.listingType || "reservation"}
              />
            </Box>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
