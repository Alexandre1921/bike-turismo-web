import React from 'react';

import { Box } from '@chakra-ui/react';

import PostCard from '../PostCard';

 
const Blog: React.FC = () => {
  return (
    <Box
      padding={4}
      w="100%"
      maxW="900px"
      mx="auto"
      sx={{ columnCount: [1, 2, 3], columnGap: "8px" }}
    >
      <PostCard
        title="Onde comprar seu caça F-16?"
        description="Hoje no Globo Reporter"
        source={"https://homepages.cae.wisc.edu/~ece533/images/airplane.png"}
        />

      <PostCard
        title="Paisagens bonitas para conhecer de Bike"
        description="Hoje no Globo Reporter"
        source={"https://homepages.cae.wisc.edu/~ece533/images/arctichare.png"}
        />

      <PostCard
        title="Melhores trilhas de 2020"
        description="venha conhecer"
        source={"https://homepages.cae.wisc.edu/~ece533/images/baboon.png"}
        />
    </Box>
  );
};


export default Blog;