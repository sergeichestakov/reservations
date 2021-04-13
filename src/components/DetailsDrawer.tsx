import * as React from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  DrawerContent,
  Text,
  Heading,
} from "@chakra-ui/react";
import { ReservationRequest } from "../types";

interface Props {
  reservation: ReservationRequest;
  isOpen: boolean;
  onClose(): void;
}

export default function DetailsDrawer({ isOpen, onClose, reservation }: Props) {
  return (
    <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
      <DrawerOverlay>
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>
            <Heading as="h5" size="sm">
              Reservation Details
            </Heading>
          </DrawerHeader>

          <DrawerBody>
            <Text>{reservation.id}</Text>
          </DrawerBody>
        </DrawerContent>
      </DrawerOverlay>
    </Drawer>
  );
}
