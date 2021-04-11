import { useRouter } from 'next/router'

import { Box, Heading, Divider, Center } from "@chakra-ui/layout";
import { response } from  '../../components/blog/PostsPanel';

const Posts = () => {
  const router = useRouter()
  const { title } = router.query

  return <p>Post: {title}</p>
};

export default Posts;
