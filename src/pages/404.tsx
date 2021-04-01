import { Button } from "@chakra-ui/button";
import { useColorMode } from "@chakra-ui/color-mode";
import { Image } from "@chakra-ui/image";
import { Box, Heading, Text, Link as ChakraLink } from "@chakra-ui/layout";
import Link from "next/link";

const Page404 = () => {
  const { colorMode } = useColorMode();

  return (
    <>
      <Box width={["100%", "70%", "60%", "60%"]} margin="0 auto">
        <Image src="/assets/icons/404 Error-pana.svg" />
      </Box>
      <Text textAlign="center" fontSize="xs">
        <ChakraLink href="https://stories.freepik.com/web" isExternal>
          Ilustração por Freepik Stories
        </ChakraLink>
      </Text>

      <Box marginY={4}>
        <Heading textAlign="center">Página não encontrada.</Heading>

        <Box textAlign="center" marginTop={4}>
          <Link href="/" passHref>
            <Button
              backgroundColor={colorMode === "light" ? "gray.300" : "teal.500"}
            >
              Voltar
            </Button>
          </Link>
        </Box>
      </Box>
    </>
  );
};

export default Page404;
