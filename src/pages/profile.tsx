import { Box, Text } from "@chakra-ui/layout";
import { Avatar } from "@chakra-ui/avatar";

// import Blog from "components/layout/Blog";
import Search from "components/Search";
import Banner from "components/Profile/Banner";
import React from "react";

const Profile: React.FC = () => {
  return (
    <Box mb={8} w="full">
      <Box m="15px 400px">
        <Search placeholder="Pesquisar" />
      </Box>
      {/* <Banner /> */}
      {/* <Text h={1}>Banner Image Render</Text> */}
      <Box m="0 0 0 203px">
        <Avatar size="2xl" name="Oswaldo Duarte" src="https://bit.ly/sage-adebayo" />
        <Box m={5}>
          <Text fontSize="3xl">
            {/* #NOME DO USUÁRIO# */}
            Oswaldo Duarte
          </Text>
          <Box>
            {/* #FOLLOWERS# */}
            <Text as="u">480</Text>
            <Text as="i">Seguidores</Text>
            |
            <Text as="u">560</Text>
            <Text as="i">Seguindo</Text>
          </Box>
          <Text>
            {/* #BIOGRAFIA# */}
            🚲 Apaixonado por novas aventuras
            <br/>
            ⭐ 5 anos praticando cicloturismo
            <br/>
            📍 Melhores trilhas do Brasil!!
          </Text>
        </Box>
      </Box>

    </Box>
  );
};

export default Profile;
