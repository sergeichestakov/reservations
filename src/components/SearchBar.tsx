import * as React from "react";
import { InputGroup, InputLeftElement, Input, Box } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface Props {
  onChange(value: string): void;
}

export default function SearchBar({ onChange }: Props) {
  return (
    <Box width="325px">
      <InputGroup>
        <InputLeftElement
          pointerEvents="none"
          children={<SearchIcon color="gray.300" />}
        />
        <Input
          placeholder="Search for a guest"
          onChange={(event) => onChange(event.target.value)}
        />
      </InputGroup>
    </Box>
  );
}
