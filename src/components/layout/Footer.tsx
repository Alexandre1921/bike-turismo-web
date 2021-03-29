import { Flex, Link, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";

import { useMediaQuery } from "@chakra-ui/media-query";
import { AiFillGithub } from "react-icons/ai";


const Footer = () => {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");

  return (
    <Flex as="footer" width="full" align="center">
<<<<<<< HEAD
      <Link href="https://github.com/Alexandre1921/bike-turismo-web" isExternal>
        <Button isFullWidth={isSmallerThan600} leftIcon={<AiFillGithub />}>
          Open in Github
        </Button>
      </Link>
=======
      {/* <Text>
        2021 -{" "}
        <Link href="https://sznm.dev" isExternal>
          sznm.dev
        </Link>
      </Text> */}
>>>>>>> main
    </Flex>
  );
};

export default Footer;
