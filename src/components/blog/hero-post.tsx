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

const HeroPost = ({
  title,
  coverImage,
  date,
  excerpt,
  author,
  slug,
}: Props) => {
  return (
    <section>
      <Box>
        <CoverImage title={title} src={coverImage} slug={slug} />
      </Box>
      <Box>
        <Box>
          <Heading as='h3'>
            <Link as={`/posts/${slug}`} href="/posts/[slug]">
              <a>{title}</a>
            </Link>
          </Heading>
          <Box >
            <DateFormatter dateString={date} />
          </Box>
        </Box>
        <Box>
          <p>{excerpt}</p>
          <Avatar name={author.name} picture={author.picture} />
        </Box>
      </Box>
    </section>
  )
}

export default HeroPost
