import { Box } from '@chakra-ui/react';
import {
  Avatar,
  DateFormatter,
  CoverImage,
  PostTitle
} from './';
import Author from '../../types/author';

type Props = {
  title: string
  coverImage: string
  date: string
  author: Author
}

const PostHeader = ({ title, coverImage, date, author }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <Box>
        <Avatar name={author.name} picture={author.picture} />
      </Box>
      <Box>
        <CoverImage title={title} src={coverImage} />
      </Box>
      <Box>
        <Box>
          <Avatar name={author.name} picture={author.picture} />
        </Box>
        <Box>
          <DateFormatter dateString={date} />
        </Box>
      </Box>
    </>
  )
}

export default PostHeader
