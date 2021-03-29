import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading } from "@chakra-ui/layout";

// Some React Icons For Testing
import { FaSearch } from 'react-icons/fa';
import { GiRank3 } from 'react-icons/gi';
import { RiRoadMapLine } from 'react-icons/ri';

// TODO: @media resposive
import { GiHamburgerMenu } from 'react-icons/gi';

import AccessibleLink from "../AccessibleLink";
import Login from "../LoginButtons";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
<<<<<<< HEAD
    <Flex 
      as="header" 
      width="full" 
      align="center" 
      justifyContent={"space-between"}
    >
      <Box marginRight="auto">
        <AccessibleLink href="/">
          <Button background={"transparent"} leftIcon={<FaSearch />}>
            <Heading as="h1">Buscar</Heading>
          </Button>
        </AccessibleLink>
        <AccessibleLink href="/">
          <Button background={"transparent"} leftIcon={<GiRank3 />}>
            <Heading as="h1">Ranking</Heading>
          </Button>
        </AccessibleLink>
        <AccessibleLink href="/map">
          <Button background={"transparent"} leftIcon={<RiRoadMapLine />}>
            <Heading as="h1">Map</Heading>
          </Button>
        </AccessibleLink>
=======
    <Flex as="header" width="full" align="center">
      <AccessibleLink href="/">
        <Heading as="h1">Bike turismo</Heading>
      </AccessibleLink>

      <Box marginLeft="auto">
>>>>>>> main
        <ThemeToggle />
      </Box>

      <Box p={0} marginLeft="auto">
        <Login />
      </Box>
    </Flex>
  );
};

export default Header;
