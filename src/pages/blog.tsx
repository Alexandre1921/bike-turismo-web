import { Box } from "@chakra-ui/layout";

import Blog from "components/layout/Blog";
import Search from "components/Search";
import React from "react";

const Home: React.FC = () => {
  return (
    <Box mb={8} w="full">
      <Search placeholder="Buscar postagem pelo nome" />
      <Blog />
    </Box>
  );
};

export default Home;
