import { Box } from "@chakra-ui/layout";

import Login from "../components/LoginButtons";
import Blog from "../components/layout/Blog";
import Search from "../components/Search";


const Home = () => {
  return (
    <Box mb={8} w="full">
      <Search placeholder="Buscar trilha pelo nome"/>
      <Blog />
    </Box>
  );
};

export default Home;
