<<<<<<< HEAD
import { Button } from "@chakra-ui/button";
import { Box, Heading } from "@chakra-ui/layout";
=======
import React from "react";
import { Box, Heading, Flex, Text, Button, FlexProps, Spinner, HStack, Divider } from "@chakra-ui/react";
import { useAuth } from "hooks/auth";
import { EditIcon, StarIcon, SearchIcon } from '@chakra-ui/icons'
import ThemeToggle from "./ThemeToggle";
import Link from 'next/link'
>>>>>>> 141af96c03ed9a8d7165eb34e665ebb2d1b444d8

type MenuItemsProps = {
  children: React.ReactNode;
  href: string;
};

<<<<<<< HEAD
import { BiLogIn } from 'react-icons/bi'; 
import { FaWpforms } from 'react-icons/fa'; 


// TODO: @media resposive
// import { GiHamburgerMenu } from 'react-icons/gi';

import AccessibleLink from "../AccessibleLink";
import ThemeToggle from "./ThemeToggle";
=======
const MenuItems: React.FC<MenuItemsProps> = ({ children, href }: MenuItemsProps) => (
  <Link href={href}>
    <Box mt={{ base: 4, md: 0 }} mr={6} display="block" cursor="pointer">
      {children}
    </Box>
  </Link>
);

const Header: React.FC<FlexProps> = (props: FlexProps) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  const { user, userDataPresent, signOut } = useAuth();
>>>>>>> 141af96c03ed9a8d7165eb34e665ebb2d1b444d8

  return (
<<<<<<< HEAD
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
=======
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding="1.5rem"
      bg="teal.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Heading as="h1" size="lg" letterSpacing={"-.1rem"}>
          Bike Turismo
        </Heading>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg
          fill="white"
          width="12px"
          viewBox="0 0 20 20"
          xmlns="http://www.w3.org/2000/svg"
        >
          <title>Menu</title>
          <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
        </svg>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "flex" }}
        width={{ sm: "full", md: "auto" }}
        minW={270}
        alignItems="center"
        flexGrow={1}
      >
        <MenuItems href="/">
          <HStack direction="row">
            <SearchIcon/>
            <Text fontSize="lg">Busca</Text>
          </HStack>
        </MenuItems>
        <MenuItems href="/ranking">
          <HStack direction="row">
            <StarIcon/>
            <Text fontSize="lg">Ranking</Text>
          </HStack>
        </MenuItems>
        <MenuItems href="/blog">
          <HStack direction="row">
            <EditIcon/>
            <Text fontSize="lg">Blog</Text>
          </HStack>
        </MenuItems>
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
        mr={2}
      >
        <ThemeToggle />
        {userDataPresent ? !!user && !user?.isAnonymous ?
            <Button colorScheme="red" border="1px" onClick={signOut}>
              Encerrar sessão
            </Button>
            :
            <Link href="/login">
              <Button colorScheme="cyan" bg="transparent" color="white" border="1px">
                Fazer login
              </Button>
            </Link>
          :
          <Spinner height={10} width={10} marginEnd="3.5em" />
        }
        
      </Box>
      
    </Flex>
>>>>>>> 141af96c03ed9a8d7165eb34e665ebb2d1b444d8
  );
};

export default Header;
