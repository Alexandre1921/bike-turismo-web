import React from "react";
import { Box, Heading, Flex, Text, FlexProps, HStack } from "@chakra-ui/react";
import { EditIcon, StarIcon, SearchIcon } from "@chakra-ui/icons";
import Link from "next/link";
import ThemeToggle from "../ThemeToggle";
import MenuItems from "./MenuItems";
import AuthButton from "./AuthButton";

const Header: React.FC<FlexProps> = (props: FlexProps) => {
  const [show, setShow] = React.useState(false);
  const handleToggle = (): void => setShow(!show);

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
        <Link href="/">
          <Heading as="h1" size="lg" letterSpacing="-.1rem" cursor="pointer">
            Bike Turismo
          </Heading>
        </Link>
      </Flex>

      <Box display={{ base: "block", md: "none" }} onClick={handleToggle}>
        <svg fill="white" width="12px" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
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
            <SearchIcon />
            <Text fontSize="lg">Busca</Text>
          </HStack>
        </MenuItems>
        <MenuItems href="/ranking">
          <HStack direction="row">
            <StarIcon />
            <Text fontSize="lg">Ranking</Text>
          </HStack>
        </MenuItems>
        <MenuItems href="/blog">
          <HStack direction="row">
            <EditIcon />
            <Text fontSize="lg">Blog</Text>
          </HStack>
        </MenuItems>
      </Box>

      <Box display={{ sm: show ? "block" : "none", md: "block" }} mt={{ base: 4, md: 0 }} mr={2}>
        <ThemeToggle />
        <AuthButton />
      </Box>
    </Flex>
  );
};

export default Header;
