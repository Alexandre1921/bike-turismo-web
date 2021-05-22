import { Box, Flex, Link } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";

const CTASection = () => {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");

  return (
    <Box textAlign="center" marginTop={8}>
      <Flex marginY={4} justifyContent="center" gridGap={2}>
        <Link
          isExternal
          href="https://accounts.google.com/Login"
        >
          {/* <Image src="LOGIN IMAGE HERE" /> */}
        </Link>
        <Link
          isExternal
          href="https://accounts.google.com/Signup"
        >
          {/* <Image src="SIGN UP IMAGE HERE" /> */}
        </Link>
      </Flex>
    </Box>
  );
};

export default CTASection;
