import { reservation } from "./data";

export enum RequestStatus {
  REQUEST = "REQUEST",
  ACCEPTED = "ACCEPTED",
  REJECTED = "REJECTED",
}

export type ReservationRequest = typeof reservation;
