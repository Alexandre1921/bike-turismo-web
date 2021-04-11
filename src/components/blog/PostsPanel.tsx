import React from 'react';

import { Card } from '.'
import { Grid } from '@chakra-ui/layout';

export type response = {
    postedAt: string;
    title: string;
    content: string;
    description: string;
    link: string;
    slug: string;
    image: string;
}

interface Props {
    posts: Array<response>,
    columns: number,
    tagsOnTop: string
} 
 
const PostsPanel: React.FC<Props> = ({ posts = [], columns, tagsOnTop })  => {

    return (
        <Grid
          style={{
              gridTemplateColumns: `repeat(${columns}, minmax(275px, 1fr))`,
              gap: "10px"
          }}
        >
            {posts.map((post, index) => 
                <Card {...{post, index, tagsOnTop, key: index}}></Card>
            )}

        </Grid>
    );
}
 
export default PostsPanel;