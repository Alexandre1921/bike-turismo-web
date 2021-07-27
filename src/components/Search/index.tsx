import React, { FC, InputHTMLAttributes } from "react";
import {
  Input,
  Box,
  InputGroup,
  InputLeftElement,
  LinkBox,
  Heading,
  LinkOverlay,
  Text,
  Collapse,
} from "@chakra-ui/react";

import { SearchIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { formatDistance } from "date-fns";
import ptBR from "date-fns/locale/pt-BR/index";

import useLogic from "./logic";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

const Search: FC<InputProps> = ({ placeholder }: InputProps) => {
  const { color, secondaryColor, handleChange, routes } = useLogic();

  return (
    <>
      <Box
        bgColor={secondaryColor}
        paddingY="0.2rem"
        paddingX="0.2rem"
        borderRadius="0.375rem"
        zIndex={1}
      >
        <Box display="flex" bgColor={color} borderRadius="0.375rem">
          <InputGroup>
            <InputLeftElement pointerEvents="none">
              <SearchIcon />
            </InputLeftElement>
            <Input placeholder={placeholder} onChange={handleChange} />
          </InputGroup>
        </Box>
        <Collapse in={!!routes[0]} animateOpacity>
          {routes.map(({ href, data }) => (
            <Box key={href} mt={1} bgColor={color} borderRadius="0.375rem">
              <LinkBox as="article" p="5" borderWidth="1px" rounded="md">
                {data?.updated_at ? (
                  <Box as="time" dateTime={data.updated_at.toDate().toUTCString()}>
                    {`Atualizado há ${formatDistance(new Date(), data.updated_at.toDate(), {
                      locale: ptBR,
                    })} atrás`}
                  </Box>
                ) : (
                  <Box as="time" dateTime={data.created_at.toDate().toUTCString()}>
                    {`Criado há ${formatDistance(new Date(), data.created_at.toDate(), {
                      locale: ptBR,
                    })} atrás`}
                  </Box>
                )}
                <Heading size="md" my="2">
                  <Link href={href}>
                    <LinkOverlay href={href}>{data.name}</LinkOverlay>
                  </Link>
                </Heading>
                <Text mb="3">{data.details}</Text>
                <Link href={href}>
                  <Box as="a" color="teal.400" href={href} fontWeight="bold">
                    Clique aqui para se aventurar
                  </Box>
                </Link>
              </LinkBox>
            </Box>
          ))}
        </Collapse>
      </Box>
    </>
  );
};

export default Search;
