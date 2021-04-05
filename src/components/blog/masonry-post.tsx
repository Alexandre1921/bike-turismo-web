import React from 'react';
import Link from 'next/link'

import { Box } from '@chakra-ui/layout';

interface Props {
    post: any;
    tagsOnTop: string;
}
 
// export interface MansoryPostState {}
 
const MansoryPost: React.FC<Props> = ({ post, tagsOnTop }: Props) => {
    const style = { backgroundImage: `url("${post.image}")` }
    // state = { :  }

    return (  
        <Box className="masonry-post overlay" style={style}>
            <Link  href={post.link}>
                <Box className="image-text"></Box>
            </Link>
        </Box>
    );
}
 
export default MansoryPost;