import React from 'react';

import Link from 'next/link'

import { Box, Heading, Text } from '@chakra-ui/layout';

import { response } from './PostsPanel'
import { Button } from '@chakra-ui/button';

// type response = {
//     date: string;
//     title: string;
//     description: string;
//     link: string;
//     image: string;
// }

interface Props {
    index: number,
    post: response,
    tagsOnTop: string,
} 

const Card: React.FC<Props> = ({post, index, tagsOnTop}) => {
   return (
    <Link href={post.link}>
    <Box
        p={5}
        key={index} 
        style={{ backgroundImage: `url("${post.image}")`}}
        borderRadius={3}
        overflow="hidden"
        _hover={{
            color: "grey",
            backgroundSize:'cover'

        }}
    >
        <Text 
          display="inline"
          p={2}
          fontSize="sm" 
          backgroundColor="blackAlpha.700"
          borderRadius={3}
        >
            {post.postedAt}
        </Text>
            <Box 
              marginTop="50px"
              p="10px"
              backgroundColor="blackAlpha.700"
              borderRadius={3}
            >
                <Heading>{post.title}</Heading>
                <Text fontSize="md">{post.description}</Text>
            </Box>
        </Box>
    </Link>
   )
}
 
export default Card;