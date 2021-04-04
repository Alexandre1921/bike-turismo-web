import { Flex, Link } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import React from "react";

import { useMediaQuery } from "@chakra-ui/media-query";
import { AiFillGithub } from "react-icons/ai";

const Footer: React.FC = () => {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");

  return (
    <Flex as="footer" width="full" align="center">
      <Link href="https://github.com/Alexandre1921/bike-turismo-web" isExternal>
        <Button isFullWidth={isSmallerThan600} leftIcon={<AiFillGithub />}>
          Open in Github
        </Button>
      </Link>
    </Flex>
  );
};

export default Footer;
