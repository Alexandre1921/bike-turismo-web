import Link from 'next/link';
import { Box, Container, Heading } from '@chakra-ui/react';
import {
  UserAvatar,
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
    <Container>
      <Box>
        <CoverImage slug={slug} title={title} src={coverImage} />
      </Box>
      <Heading as="h3">
        <Link as={`/posts/${slug}`} href="/posts/[slug]">
          <a>{title}</a>
        </Link>
      </Heading>
      <Box>
        <DateFormatter dateString={date} />
      </Box>
      <p>{excerpt}</p>
      <UserAvatar name={author.name} picture={author.picture} />
    </Container>
  )
}

export default PostPreview;
