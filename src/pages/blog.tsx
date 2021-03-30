import { Box } from "@chakra-ui/layout";

import Blog from "components/layout/Blog";
import Search from "components/Search";


const Home = () => {
  return (
    <Box mb={8} w="full">
      <Search placeholder="Buscar post pelo nome"/>
      <Blog />
    </Box>
  );
};

export default Home;
