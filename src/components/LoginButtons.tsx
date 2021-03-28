import { Button } from "@chakra-ui/button";

import { BiLogIn } from 'react-icons/bi'; 
import { FaWpforms } from 'react-icons/fa'; 

import { Box, Flex, Link } from "@chakra-ui/layout";
import { useMediaQuery } from "@chakra-ui/media-query";


const Login = () => {
  const [isSmallerThan600] = useMediaQuery("(max-width: 600px)");

  return (
    <Box textAlign="center" marginTop={4}>
      <Flex marginY={4} justifyContent="center" gridGap={3}>
        <Link
          href="/login"
        >
          <Button isFullWidth={isSmallerThan600} leftIcon={<BiLogIn />}>
            Login
          </Button>
          {/* <Image src="LOGIN IMAGE HERE" /> */}
        </Link>
        <Link
          isExternal
          href="https://accounts.google.com/Signup"
        >
          <Button isFullWidth={isSmallerThan600} leftIcon={<FaWpforms />}>
            Sign out
          </Button>
          {/* <Image src="SIGN UP IMAGE HERE" /> */}
        </Link>
      </Flex>
    </Box>
  );
};

export default Login;
