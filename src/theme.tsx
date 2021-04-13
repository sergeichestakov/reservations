import { extendTheme } from "@chakra-ui/react";
import { createBreakpoints } from "@chakra-ui/theme-tools";

const fonts = {
  mono: `'Menlo', monospace`,
  body: "ABeeZee",
  heading: "ABeeZee",
  button: "ABeeZee",
};

const breakpoints = createBreakpoints({
  sm: "40em",
  md: "52em",
  lg: "64em",
  xl: "80em",
});

const theme = extendTheme({
  colors: {
    black: "#16161D",
    request: {
      blue: "#1781FF",
      green: "#087B06",
      orange: "#E79B09",
      red: "#D80A0A",
    },
    details: {
      grey: "#6A707D",
    },
  },
  fonts,
  breakpoints,
});

export default theme;
