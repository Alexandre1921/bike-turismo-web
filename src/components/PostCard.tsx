import React from 'react';

import { LinkBox, Heading, Text, Image, LinkOverlay } from '@chakra-ui/react';

type PostProps = {
    title: string;
    description: string;
    source: string;

}
 
const Post: React.FC<PostProps> = ({ title, description, source }) => {
    return (
      <LinkBox
        width="sm"
        margin="60px auto"
        padding="10px"
        maxW="sm"
        overflow="hidden"
        borderWidth="1px"
        borderRadius="lg"
        transform=".25s"
      >
      <Text 
        color="grey"
        padding="2px .5px" 
        fontSize="11px" 
        fontWeight="600"
      >
        Março 26, 2021
      </Text>
      <Image 
        w="180"
        display="block"
        paddingRight="4px"
        src={source} 
        alt="..." 
      />
      <LinkOverlay m="4" href="#">
        <Heading fontSize="xl">{title}</Heading>
      </LinkOverlay>
      <Text mt={4} lineHeight="1.8">{description}</Text>
    </LinkBox>
    );
}
 
export default Post;
