import { Box } from '@chakra-ui/react';

type Props = {
  content: string
}

const PostBody = ({ content }: Props) => {
  return (
    <Box>
      <Box
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Box>
  )
}

export default PostBody
