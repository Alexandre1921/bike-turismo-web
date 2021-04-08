import Link from "next/link";
import React from "react";
import { Box } from "@chakra-ui/react";

type MenuItemsProps = {
  children: React.ReactNode;
  href: string;
};

const MenuItems: React.FC<MenuItemsProps> = ({ children, href }: MenuItemsProps) => (
  <Link href={href}>
    <Box mt={{ base: 4, md: 0 }} mr={6} display="block" cursor="pointer">
      {children}
    </Box>
  </Link>
);

export default MenuItems;
