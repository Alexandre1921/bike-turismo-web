import Link from 'next/link';
import { Box, Heading } from '@chakra-ui/react';
import {
  Avatar,
  DateFormatter,
  CoverImage
} from './';
import Author from '../../types/author';

type Props = {
  title: string
  coverImage: string
  date: string
  excerpt: string
  author: Author
  slug: string
}

const PostPreview = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <Box>
      <Box>
        <CoverImage slug={slug} title={title} src={coverImage} />
      </Box>
      <Heading as='h3'>
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a>{title}</a>
        </Link>
      </Heading>
      <Box>
        <DateFormatter dateString={date} />
      </Box>
      <p>{excerpt}</p>
      <Avatar name={author.name} picture={author.picture} />
    </Box>
  )
}

export default PostPreview;
