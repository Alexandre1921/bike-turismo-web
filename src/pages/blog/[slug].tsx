import { useRouter } from 'next/router'

import { Box, Divider, Heading } from "@chakra-ui/layout";
import feature from 'mocks/feature';
import Link from 'next/link';

function getRouter() {
  const promise = new Promise ((resolve, reject) =>  {
    const router = useRouter()
    const { slug } = router.query
    
    console.log(slug)
    
    resolve({
      success: true,
      slug: slug,
    })
  })

  return promise
}

async function getSlugIndex(slug: string) {
  feature.map((post, index: number) => {
    const slugFeature = Object.values(post)[5]

    if ( slug === slugFeature ) {
      return index
    }
  })
}

const Posts = async () => {
  const slugResult = getRouter()
  console.log("resultado:" + slugResult)
  // const index = await getSlugIndex(slugResult)

  return (
    <Box>
      <Heading>Post:{feature[0].title}</Heading>
      <Box>{feature[0].description}</Box>
      <Divider />
      <Box>
        {feature[0].content}
      </Box>
    </Box>
  )
} 
    

export default Posts;
