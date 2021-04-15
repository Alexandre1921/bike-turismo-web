import { Box, Heading } from "@chakra-ui/layout";
import { PostPanel } from '../../components/blog';

import Search from "../../components/Search";

import { feature, trending } from '../../lib/data';

const Blog = () => {
  return (
    <Box p={10}>
      <Box p={2}>
        <Search placeholder="Procurar Postagem" />
        <Heading>Recentes</Heading>
        <PostPanel posts={feature} columns={3} tagsOnTop="main" />
      </Box>
      <Box p={2}>
        <Heading>Mais acessados</Heading>
        {/* <PostPanel posts={trending} columns={2} tagsOnTop="second" /> */}
      </Box>
    </Box>

  );
};

export default Blog;
