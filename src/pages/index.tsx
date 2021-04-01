import { Box } from "@chakra-ui/layout";

<<<<<<< HEAD
import Blog from "../components/layout/Blog";
import Search from "../components/Search";
=======
import Search from "components/Search";
>>>>>>> 141af96c03ed9a8d7165eb34e665ebb2d1b444d8


const Home = () => {
  return (
    <Box mb={8} w="full">
      <Search placeholder="Buscar trilha pelo nome"/>
    </Box>
  );
};

export default Home;
