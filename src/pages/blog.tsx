import { Box, Heading } from "@chakra-ui/layout";
import { PostPanel } from  '../components/blog/';
import trending from '../mocks/trending';

import Search from "components/Search";




const Blog = () => {

  return (
    <Box className="container blog">
      <Box className="row">
        <Heading>Mais acessados</Heading>
        
        {/*  TODO for each blog panel on post */}
        <PostPanel posts={trending} />

      </Box>
    </Box>

  );
};

export default Blog;
