import { Box } from '@chakra-ui/layout';
import { Image } from "@chakra-ui/react"
import Link from 'next/link';

type Props = {
  title: string
  src: string
  slug?: string
}

const CoverImage = ({ title, src, slug }: Props) => {
  const image = <Image src={`${src}`} alt={`${title}`} />
  
  return (
    <Box>
      {slug ? (
        <Link as={`/blog/${slug}`} href="/blog/[slug]">
          <a aria-label={title}>{image}</a>
        </Link>
      ) : (
        image
      )}
    </Box>
  )
}

export default CoverImage;
