import { Box, Heading } from "@chakra-ui/layout";
import { PostMasonry } from  '../components/blog/'
import trending from '../mocks/trending';

import Search from "components/Search";

interface trending {
    date: string,
    title: string,
    description: string,
    link: string,
    image: string,
}[]

const Blog = () => {
  return (
    <Box className="container blog">
      <Box className="row">
        <Heading>Mais acessados</Heading>
        
        {/* {
          trending.map((item) => {
            return <Heading>{item.description}</Heading>
          })
        } */}

        {/* <PostMasonry posts={trending} columns={3} /> */}
      </Box>
    </Box>

  );
};

export default Blog;
