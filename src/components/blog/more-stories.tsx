import { PostPreview } from './'
import Post from '../../types/post'
import { Box, Heading } from '@chakra-ui/layout'

type Props = {
  posts: Post[]
}

const MoreStories = ({ posts }: Props) => {
  return (
    <section>
      <Heading>
        More Stories
      </Heading>
      <Box>
        {posts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            coverImage={post.coverImage}
            date={post.date}
            author={post.author}
            slug={post.slug}
            excerpt={post.excerpt}
          />
        ))}
      </Box>
    </section>
  )
}

export default MoreStories;
