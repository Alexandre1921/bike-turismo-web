import React from 'react';

import { Box, Grid, Heading } from '@chakra-ui/layout';
import Link from 'next/link'
import { Card } from '.'

type response = {
    date: string;
    title: string;
    description: string;
    link: string;
    image: string;
}

interface Props {
    posts: Array<response>
} 
 
const PostsPanel: React.FC<Props> = ({ posts = [] })  => {
    console.log(posts)

    return (
        <>
            {posts.map((post, index) => (
                <Box  
                  w="60%"
                  p={10}
                  key={index} 
                  style={{ backgroundImage: `url("${post.image}")`}}
                >
                    <p>{post.date}</p>
                    <Link href={post.link}>
                        <Box>
                            <Heading>{post.title}</Heading>
                            <p>{post.description}</p>
                        </Box>
                    </Link>
                </Box>
            ))}
        </>
    );
}
 
export default PostsPanel;