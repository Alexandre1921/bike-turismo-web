import { Box } from "@chakra-ui/layout";

import Search from "components/Search";


const Home = () => {
  return (
    <Box mb={8} w="full">
      <Search placeholder="Buscar trilha pelo nome"/>
    </Box>
  );
};

export default Home;
