import { useColorMode } from "@chakra-ui/color-mode";
import { Box, Heading } from "@chakra-ui/layout";
import React from "react";

import HelperImage from "./HelperImage";

const SomeText: React.FC = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Heading as="h2" fontSize="3xl">
        Hello
      </Heading>

      <Box
        backgroundColor={colorMode === "light" ? "gray.500" : "gray.200"}
        padding={4}
        borderRadius={4}
      >
        <Box d="flex" alignItems="center" fontSize="sm">
          This is a
          <HelperImage src="/nextjs-black-logo.svg" label="NextJS" />
          app with
          <HelperImage src="/chakra-ui-logomark-colored.svg" label="Chakra UI" />
          and
          <HelperImage src="/ts-logo-512.svg" label="TypeScript" />
          setup.
        </Box>
      </Box>
    </>
  );
};

export default SomeText;
