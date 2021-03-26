import { Button } from "@chakra-ui/button";
import { Box, Flex, Heading } from "@chakra-ui/layout";

// Some React Icons For Testing
import { FaSearch } from 'react-icons/fa';
import { GiRank3 } from 'react-icons/gi';
import { RiRoadMapLine } from 'react-icons/ri';

import AccessibleLink from "../AccessibleLink";
import Login from "../LoginButtons";

const Header = () => {
  return (
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
        <AccessibleLink href="/">
          <Button background={"transparent"} leftIcon={<RiRoadMapLine />}>
            <Heading as="h1">Map</Heading>
          </Button>
        </AccessibleLink>
      </Box>

      <Box marginLeft="auto">
        <Login />
      </Box>
    </Flex>
  );
};

export default Header;
