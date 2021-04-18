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
      <Container centerContent>
        <Box>
          <CoverImage title={title} src={coverImage} slug={slug} />
        </Box>
        <Box>
          <Box p="6px 0">
            <Heading as='h3'>
              <Link as={`/posts/${slug}`} href="/posts/[slug]">
                <a>{title}</a>
              </Link>
            </Heading>
            <Box
              color="black"
              backgroundColor="white"
              display="inline-block"
              p={1}
              m="1px 0"
              borderRadius={6}
            >
              <DateFormatter dateString={date} />
            </Box>
          </Box>
          <Box>
            <p>{excerpt}</p>
            {/* <UserAvatar name={author.name} picture={author.picture} /> */}
          </Box>
        </Box>
      </Container>
    </section>
  )
}

export default HeroPost
