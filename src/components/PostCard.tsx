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
        margin="5px"
      >
        <Text 
          color="grey"
          padding="8px 1px" 
          fontSize="11px" 
          fontWeight="600"
        >
          Março 26, 2021
        </Text>
        <Box h="14rem">
          <Image
            objectFit="fill" 
            display="inline-block"
            paddingRight="4px"
            src={source} 
            alt="image" 
          />
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
        </Box>
    </LinkBox>
    );
}
 
export default Post;
