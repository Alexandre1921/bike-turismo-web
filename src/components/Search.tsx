import React, { FC, InputHTMLAttributes, useCallback, useEffect, useState } from 'react';
import { Input, Box, InputGroup, InputLeftElement, LinkBox, Heading, LinkOverlay, Text, Collapse, useColorModeValue } from '@chakra-ui/react';

import { SearchIcon } from "@chakra-ui/icons"
import { db } from 'utils/firebase';
import Link from 'next/link';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  placeholder: string;
}

const Search: FC<InputProps> = ({placeholder, ...rest }) => {
  const [ searchValue, setSearchValue ] = useState<string>();
  const [ routes, setRoutes ] = useState<{href: string; data: { name: string, details: string }}[]>([]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.currentTarget.value.toLowerCase());
  }, [setSearchValue]);

  useEffect(()=>{
    searchValue && db.collection("routes")
      .orderBy('nickname')
      .startAt(searchValue)
      .endAt([searchValue + '\uf8ff'])
      .get()
      .then(({ docs }) => setRoutes(docs.map(doc => ({ href: `/map?mapId=${doc.id}`, data: doc.data() as { name: string, details: string } }))));
  }, [searchValue, setRoutes]);

  const color = useColorModeValue("white", "gray.800");
  const secondaryColor = useColorModeValue("gray.100", "gray.900");

  return (
    <>
      <Box bgColor={secondaryColor} paddingY="0.2rem" paddingX="0.2rem" borderRadius="0.375rem" zIndex={1}>
        <Box display="flex" bgColor={color} borderRadius="0.375rem">
          <InputGroup>
            <InputLeftElement
                pointerEvents="none"
            >
                <SearchIcon/>
            </InputLeftElement>
            <Input placeholder={placeholder} onChange={handleChange}></Input>
          </InputGroup>
        </Box>
        <Collapse in={!!routes[0]} animateOpacity>
          {routes.map(({ href, data}) => (
            <Box mt={1} bgColor={color} borderRadius="0.375rem">
            <LinkBox as="article" p="5" borderWidth="1px" rounded="md">
              <Box as="time" dateTime="2021-01-15 15:30:00 +0000 UTC">
                1 dia atrás
              </Box>
              <Heading size="md" my="2">
                <Link href={href}>
                  <LinkOverlay href={href}>
                    {data.name}
                  </LinkOverlay>
                </Link>
              </Heading>
              <Text mb="3">
                {data.details}
              </Text>
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
  )
}
 
export default Search;