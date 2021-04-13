import * as React from "react";
import { HStack, Circle, Text } from "@chakra-ui/react";
import { RequestStatus } from "../types";

export default function StatusIndicator({
  status,
  circleSize = "8px",
  fontSize,
}: {
  status: RequestStatus;
  circleSize?: string;
  fontSize?: string;
}) {
  const color = getColorForStatus(status);
  const text = getTextForStatus(status);

  return (
    <HStack>
      <Circle size={circleSize} bg={color} />{" "}
      <Text fontSize={fontSize} color={color}>
        {text}
      </Text>
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
