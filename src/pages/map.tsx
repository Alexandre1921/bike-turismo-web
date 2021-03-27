import { Box, Divider, Heading } from "@chakra-ui/layout";

import { useMemo } from "react";
import dynamic from 'next/dynamic'


const Map = () => {

  const Map = useMemo(() => dynamic(
    () => import('components/map'), // replace '@components/map' with your component's location
    { 
      loading: () => <p>A map is loading</p>,
      ssr: false // This line is important. It's what prevents server-side render
    }
  ), [/* list variables which should trigger a re-render here */])
  
  return (
    <Box mb={8} w="full" h="container.md">
      <Heading>Rota para UTFPR</Heading>
      <Divider bgColor="#666" marginTop={3} marginBottom={5} />
      <Map />
    </Box>
  );
};

export default Map;
