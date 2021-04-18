import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import Head from 'next/head';
import { Box } from '@chakra-ui/react'
import PostType from '../../types/post';
import { PostHeader, PostBody } from '../../components/blog';
import { getPostBySlug, getAllPosts } from '../../lib/api'
import markdownToHtml from 'lib/markdownToHtml';

type Props = {
  post: PostType
  morePosts: PostType[]
  preview?: boolean
}

const Post = ({ post, morePosts, preview }: Props) => {
  const router = useRouter();
  
  if (!router.isFallback && !post?.slug) {
    return <ErrorPage statusCode={404} />
  }

  return (
    <Box>
      <article>
        <Head>
          <title>
            {post.title} | Blog Bike turismo
          </title>
          <meta property="og:image" content={post.ogImage.url} />
        </Head>
        <PostHeader
          title={post.title}
          coverImage={post.coverImage}
          date={post.date}
          author={post.author}
        />
        <PostBody content={post.content} />
      </article>
    </Box>
  )
}

export default Post;

type Params = {
  params: {
    slug: string
  }
}

export async function getStaticProps({ params }: Params) {
  const post = getPostBySlug(params.slug, [
    'title',
    'date',
    'slug',
    'author',
    'content',
    'ogImage',
    'converImage',
  ])
  const content = await markdownToHtml(post.content || '');

  return {
    props: {
      post: {
        ...post,
        content,
      },
    },
  }
}

export async function getStaticPaths() {
  const posts = getAllPosts(['slug']);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      }
    }),
    fallback: false,
  }
}