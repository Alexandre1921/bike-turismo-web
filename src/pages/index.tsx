import { Box } from "@chakra-ui/layout";

import Login from "../components/LoginButtons";
import Blog from "../components/layout/Blog";


const Home = () => {
  return (
    <Box mb={8} w="full">
      <Blog />
    </Box>
  );
};

export default Home;
