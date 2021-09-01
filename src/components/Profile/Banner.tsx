import { Box, Text } from "@chakra-ui/layout";
import Image from "next/image";
import React from "react";

const Banner: React.FC = () => {
  return (
    <>
      <Box marginY={8} maxWidth={400} marginX="auto">
        <Image
          src=""
          width={1440}
          height={300}
        />
      </Box>
    </>
  );
};

export default Banner;
