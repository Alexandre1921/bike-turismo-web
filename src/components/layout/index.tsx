import { Box, Center } from "@chakra-ui/layout";
import React, { ReactNode } from "react";

import Header from "./Header";
// import Footer from "./Footer";
import Meta from "./Meta";

type LayoutProps = {
  children: ReactNode;
};

const Layout: React.FC<LayoutProps> = ({ children }: LayoutProps) => {
  return (
    <Box margin="0 auto" minWidth={350} transition="0.5s ease-out">
      <Meta />
      <Box margin="0">
        <Header />
        <Center>
          <Box as="main" maxWidth={1200} marginY={22}>
            {children}
          </Box>
        </Center>
        {/* <Footer /> */}
      </Box>
    </Box>
  );
};

export default Layout;
