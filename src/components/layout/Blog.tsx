import React from 'react';

import { Grid, GridItem } from '@chakra-ui/react';

import PostCard from '../PostCard';

 
const Blog: React.FC = () => {
  return (
    <Grid
      h="40vh"
      w="60vw"
      templateRows="repeat(2, auto)"
      templateColumns="repeat(4, auto)"
      gap={1}
    >
      <GridItem rowSpan={2} colSpan={3}>
        <PostCard
          title="Onde comprar seu caça F-16?"
          description="Hoje no Globo Reporter"
          source={"https://homepages.cae.wisc.edu/~ece533/images/airplane.png"}
        />
      </GridItem>
    
      <GridItem rowSpan={1}>
        <PostCard
          title="Paisagens bonitas para conhecer de Bike"
          description="Hoje no Globo Reporter"
          source={"https://homepages.cae.wisc.edu/~ece533/images/arctichare.png"}
        />
      </GridItem>
      
      <GridItem rowSpan={1}>
        <PostCard
          title="Melhores trilhas de 2020"
          description="venha conhecer"
          source={"https://homepages.cae.wisc.edu/~ece533/images/baboon.png"}
        />
      </GridItem>
    </Grid>
  );
};


export default Blog;