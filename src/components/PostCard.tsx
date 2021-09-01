import React from "react";

import { LinkBox, Heading, Text, Image, LinkOverlay, Box } from "@chakra-ui/react";

type PostProps = {
  title: string;
  description: string;
  source: string;
};

const Post: React.FC<PostProps> = ({ title, description, source }: PostProps) => {
  return (
    <LinkBox margin="5px">
      <Text color="grey" padding="4px" fontSize="11px" fontWeight="600">
        Março 26, 2021
      </Text>

      <Box>
        <Image
          objectFit="cover"
          minHeight="18rem"
          display="inline-block"
          paddingRight="4px"
          src={source}
          alt="image"
        />

        <Box>
          <LinkOverlay m="4" href="#">
            <Heading h="auto" fontSize="xl">
              {title}
            </Heading>
          </LinkOverlay>
        </Box>

        <Box>
          <Text marginTop="0">{description}</Text>
        </Box>
      </Box>
    </LinkBox>
  );
};

export default Post;
