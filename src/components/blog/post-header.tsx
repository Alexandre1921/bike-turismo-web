import { Box, Center, Divider } from '@chakra-ui/react';
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
      <PostTitle>{title}</PostTitle>
      <Box
        p="0.5em 0"
        display="flex"
      >
        <UserAvatar name={author.name} picture={author.picture} />
        <Center height="35px">
          <Divider orientation="vertical" />
        </Center>
        <Box p="9px 14px">
          <DateFormatter dateString={date} />
        </Box>
      </Box>
      <Box borderRadius={10}>
        <CoverImage title={title} src={coverImage} />
      </Box>
    </>
  )
}

export default PostHeader
