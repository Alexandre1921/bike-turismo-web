import Link from 'next/link';
import { Box, Container, Heading } from '@chakra-ui/react';
import {
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
        <Link as={`/blog/${slug}`} href="/blog/[slug]">
          <a>{title}</a>
        </Link>
      </Heading>
      <Box>
        <DateFormatter dateString={date} />
      </Box>
      <p>{excerpt}</p>
    </Container>
  )
}

export default PostPreview;
