import React from 'react';

import { Grid, GridItem } from '@chakra-ui/react';

import PostCard from '../PostCard';

 
const Blog: React.FC = () => {
  return (
    <Grid
      h="100px"
      w="65rem"
      justifyContent="center"
      templateRows="repeat(2, 1fr)"
      templateColumns="repeat(4, 1fr)"
      gap={3}
    >
      <GridItem rowSpan={2} colSpan={1} >
        <PostCard
          title="Onde comprar seu caça F-16?"
          description="Hoje no Globo Reporter"
          source={"https://homepages.cae.wisc.edu/~ece533/images/airplane.png"}
          />
      </GridItem> 
      
      <GridItem rowSpan={2} colSpan={1} >
        <PostCard
          title="Paisagens bonitas para conhecer de Bike"
          description="Hoje no Globo Reporter"
          source={"https://homepages.cae.wisc.edu/~ece533/images/fruits.png"}
        />
      </GridItem>

      <GridItem rowSpan={2} colSpan={1} >
        <PostCard
          title="Melhores trilhas de 2020"
          description="venha conhecer"
          source={"https://homepages.cae.wisc.edu/~ece533/images/barbara.png"}
          />
      </GridItem>
    </Grid>
  );
};


export default Blog;