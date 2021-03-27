import React from 'react';

import { LinkBox, Heading, Text, Image, LinkOverlay, Box } from '@chakra-ui/react';

type PostProps = {
    title: string;
    description: string;
    source: string;

}
 
const Post: React.FC<PostProps> = ({ title, description, source }) => {
    return (
      <LinkBox
        padding={4}
        h="25rem"
        w="100%"
        maxW="900px"
        mx="auto"
        overflow="hidden"
        borderWidth="1px"
        borderRadius="xl"
      >
      <Text 
        color="grey"
        padding="2px .5px" 
        fontSize="11px" 
        fontWeight="600"
      >
        Março 26, 2021
      </Text>
      <Box h="14rem">
        <Image 
          h="auto"
          w="auto"
          display="inline-block"
          paddingRight="4px"
          src={source} 
          alt="..." 
        />
      </Box>
      <Box h="5em">
        <LinkOverlay m="4" href="#">
          <Heading fontSize="xl">{title}</Heading>
        </LinkOverlay>
      </Box>
      <Text 
        mt={4}
        lineHeight="1.8"
        marginTop="0"
      >
        {description}
      </Text>
    </LinkBox>
    );
}
 
export default Post;
