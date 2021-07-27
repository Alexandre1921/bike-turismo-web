import { Image } from "@chakra-ui/image";
import { Box, Center, Grid, GridItem, Heading, SimpleGrid } from "@chakra-ui/layout";

import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};
const Home: React.FC = () => {
  return (
    <Box width="100%" height="100%">
      <Grid templateColumns="repeat(5, 1fr)" gap={1}>
        <GridItem colSpan={3} h="10" bg="tomato">
          <Carousel
            showDots
            responsive={responsive}
            ssr // means to render carousel on server-side.
            autoPlaySpeed={1000}
            keyBoardControl
            transitionDuration={500}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
          >
            <Box minH={200}>
              <p>Olá</p>
            </Box>
            <Box minH={200}>
              <Center>
                <Image src="/assets/cat-4548812_960_720.jpg" />
              </Center>
            </Box>
            <Box minH={200}>
              <Center>
                <Image src="/assets/cat2.jpg" />
              </Center>
            </Box>
          </Carousel>
        </GridItem>
        <GridItem colSpan={2} h="10" bg="papayawhip">
          <Heading>Vendinha</Heading>
        </GridItem>
      </Grid>
    </Box>
  );
};

export default Home;
