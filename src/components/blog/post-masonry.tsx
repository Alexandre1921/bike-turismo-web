import React from 'react';
import { MasonryPost } from './'
import { Box, Grid } from '@chakra-ui/layout';

interface Props {
    posts: Array<string>;
    columns: number;
    tagsOnTop: string;
}
 
export interface PostMasonryState {}
 
const PostMasonry: React.FC<Props> = ({ posts, columns, tagsOnTop }: Props) => {
    // state = { :  }
    return (
        <Grid className='masonry' {...{ templateColumns:`repeat(${columns}, minmax(275px, 1fr))` }} gap={3}>
            {  posts.map((post, index) => 
                // Destructuring an Object
                <MasonryPost {...{post, index, tagsOnTop, key: index }} />
            )}
        </Grid>
    )
}
 
export default PostMasonry;