import { Button } from "@chakra-ui/button";
import { Box, Heading } from "@chakra-ui/layout";

// Some React Icons For Testing
import { FaSearch } from 'react-icons/fa';
import { GiRank3 } from 'react-icons/gi';
import { RiRoadMapLine } from 'react-icons/ri';

import { BiLogIn } from 'react-icons/bi'; 
import { FaWpforms } from 'react-icons/fa'; 


// TODO: @media resposive
// import { GiHamburgerMenu } from 'react-icons/gi';

import AccessibleLink from "../AccessibleLink";
import ThemeToggle from "./ThemeToggle";

const Header = () => {
  return (
    <Box id="myTopnav" className="Header">
      {/* <ThemeToggle /> */}
      
      <AccessibleLink href="/">
        <Button className="nav" background="transparent" leftIcon={<FaSearch />}>
          <Heading as="h1">Buscar</Heading>
        </Button>
      </AccessibleLink>
      <AccessibleLink href="/ranking">
        <Button className="nav" background="transparent" leftIcon={<GiRank3 />}>
          <Heading as="h1">Ranking</Heading>
        </Button>
      </AccessibleLink>
      <AccessibleLink href="/map">
        <Button className="nav" background="transparent" leftIcon={<RiRoadMapLine />}>
          <Heading as="h1">Map</Heading>
        </Button>
      </AccessibleLink>
      <AccessibleLink href="/login">
        <Button leftIcon={<BiLogIn />}>
          Login
        </Button>
      </AccessibleLink>
      <AccessibleLink href="/signup">
        <Button leftIcon={<FaWpforms />}>
          Sign out
        </Button>
      </AccessibleLink>
    </Box>
  );
};

export default Header;
