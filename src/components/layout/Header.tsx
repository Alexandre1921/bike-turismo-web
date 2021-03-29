import React from "react";
import { Box, Heading, Flex, Text, Button, FlexProps, Link, Spinner, HStack } from "@chakra-ui/react";
import { useAuth } from "hooks/auth";
import { StarIcon, SearchIcon } from '@chakra-ui/icons'


type MenuItemsProps = {
  children: React.ReactNode;
  href: string;
};

const MenuItems: React.FC<MenuItemsProps> = ({ children, href }: MenuItemsProps) => (
  <Link href={href}>
    <Text mt={{ base: 4, md: 0 }} mr={6} display="block">
      {children}
    </Text>
  </Link>
);

const Header: React.FC<FlexProps> = (props: FlexProps) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = () => setShow(!show);
  const { user, userDataPresent, signOut } = useAuth();

  return (
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
      </Box>

      <Box
        display={{ sm: show ? "block" : "none", md: "block" }}
        mt={{ base: 4, md: 0 }}
      >
        {userDataPresent ? !!user && !user?.isAnonymous ?
            <Button colorScheme="red" border="1px" onClick={signOut}>
              Encerrar sessão
            </Button>
            :
            <Link href="/login">
              <Button bg="transparent" border="1px">
                Fazer login
              </Button>
            </Link>
          :
          <Spinner height={10} width={10} marginEnd="3.5em" />
        }
      </Box>
    </Flex>
  );
};

export default Header;
