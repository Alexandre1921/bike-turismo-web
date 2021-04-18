import { Box } from '@chakra-ui/react';
import {
  UserAvatar,
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
      <PostTitle>{title.toUpperCase()}</PostTitle>
      <Box p="0.5em 0">
        <UserAvatar name={author.name} picture={author.picture} />
      </Box>
      <Box>
        <CoverImage title={title} src={coverImage} />
      </Box>
      <Box>
        <Box>
          <DateFormatter dateString={date} />
        </Box>
      </Box>
    </>
  )
}

export default PostHeader
