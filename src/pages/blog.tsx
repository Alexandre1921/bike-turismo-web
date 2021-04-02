import { Box, Heading } from "@chakra-ui/layout";
import { PostMasonry } from  '../components/post-mansory';
import trending from '../mocks/trending';

// import Blog from "components/layout/Blog";
import Search from "components/Search";


const Blog = () => {
  return (
    <Box className="container blog">
      <Box className="row">
        <Heading>Mais acessados</Heading>
        <PostMasonry posts={trending} columns={3} />
      </Box>
    </Box>

  );
};

export default Blog;
