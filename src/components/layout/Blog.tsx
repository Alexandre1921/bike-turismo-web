import React from "react";

import { Box, Flex } from "@chakra-ui/react";
import { useMediaQuery } from "@chakra-ui/media-query";

import PostCard from "../PostCard";

const Blog: React.FC = () => {
  const [isSmallerThan680] = useMediaQuery("(max-width: 680px)");

  return (
    <Flex flexDirection={isSmallerThan680 ? "column" : "row"}>
      <Box>
        <PostCard
          title="Por que andar de bike faz bem?"
          description="A bicicleta é um excelente meio de transporte que pode ajudar
          até mesmo a evitar a poluição do meio..."
          source="https://i.ibb.co/4FczZJD/murillo-de-paula-o2-FCfh-NSj-Po-unsplash.jpg"
        />
      </Box>
      <Box>
        <PostCard
          title="Melhores marcas de bike para trilha"
          description="Se você quer iniciar essa nova atividade, recomendamos que escolha
          uma bicicleta destinada a esse..."
          source="https://i.ibb.co/KyxNh9C/josh-nuttall-XVTWFHc-NIko-unsplash.jpg"
        />
      </Box>
      <Box>
        <PostCard
          title="Melhores trilhas de 2020"
          description="Uma das características mais bacanas de praticar mountain bike é
          que não existe rotina nem..."
          source="https://i.ibb.co/gd6QJTx/guillaume-techer-8-EHz-Tdx85-VQ-unsplash.jpg"
        />
      </Box>
    </Flex>
  );
};

export default Blog;
