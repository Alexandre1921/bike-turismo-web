//https://nextjs.org/docs/basic-features/data-fetching

import Head from 'next/head';

import { trending } from '../../lib/data';
import { response } from 'components/blog/PostsPanel';

export default function BlogPage({ title, content }: response) {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1>{title}</h1>
        <div>{content}</div>
      </main>
    </div>
  );
}

export async function getStaticProps(context: any) {
  console.log('hi!', context)

  const { params } = context;

  return {
    props: trending.find((item) => item.slug === params.slug),
  }
}

export async function getStaticPaths() {
  const foo = {
    paths: trending.map((item) => (
      { params: { slug: item.slug } }
    )),
    fallback: 'blocking',
  };

  return {
    paths: [
      { params: { slug: 'first' } },
      { params: { slug: 'second' } }
    ],
    fallback: true
  }
}
