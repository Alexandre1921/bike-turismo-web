import { Box, Flex, Heading } from "@chakra-ui/layout";

// Some React Icons For Testing
import { FaSearch } from 'react-icons/fa';
import { GiRank3 } from 'react-icons/gi';
import { RiRoadMapLine } from 'react-icons/ri';

import AccessibleLink from "../AccessibleLink";
import Login from "../Login";

const Header = () => {
  return (
    <Flex as="header" width="full" align="center">
      <AccessibleLink href="/">
        <FaSearch />
        <Heading as="h1">Buscar</Heading>
      </AccessibleLink>
      <AccessibleLink href="/">
        <GiRank3 />
        <Heading as="h1">Ranking</Heading>
      </AccessibleLink>
      <AccessibleLink href="/">
        <RiRoadMapLine />
        <Heading as="h1">Map</Heading>
      </AccessibleLink>

      <Box marginLeft="auto">
        <Login />
      </Box>
    </Flex>
  );
};

export default Header;
