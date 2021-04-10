import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Center, Divider, Heading, LinkBox, Text } from "@chakra-ui/layout";
import { Spinner } from "@chakra-ui/spinner";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { IRoute } from "components/map";

import Search from "components/Search";
import { formatDistance } from "date-fns";
import ptBR from "date-fns/locale/pt-BR/index";

import dynamic from "next/dynamic";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";
import firebase, { db, storage } from "utils/firebase";
import genKey from "utils/genKey";

interface ISetRoute extends IRoute {
  id: string;
  href: string;
}

const useLogic = () => {
  const [routes, setRoutes] = useState<Array<ISetRoute>>([]);
  const color = useColorModeValue("white", "gray.800");

  useEffect(() => {
    db.collection("routes")
      .orderBy("stars")
      .limit(5)
      .get()
      .then(query =>
        query.empty ? Promise.reject(new Error("Nenhuma rota encontrada")) : query.docs
      )
      .then(docs =>
        docs.map(doc => {
          const data = doc.data() as IRoute;

          const getDownloadUrl = (avatar_url: string): Promise<string> =>
            storage.ref(`/routes/${doc.id}/${avatar_url}`).getDownloadURL();

          return Promise.all(data.pointers.map(pointer => getDownloadUrl(pointer.avatar_url))).then(
            pointersUrl =>
              getDownloadUrl(data.avatar_url).then(res =>
                setRoutes(oldRoutes => [
                  ...oldRoutes,
                  {
                    ...data,
                    id: doc.id,
                    href: `/map?mapId=${doc.id}`,
                    avatar_url: res,
                    pointers: data.pointers.map((pointer, index) => ({
                      ...pointer,
                      avatar_url: pointersUrl[index],
                    })),
                  },
                ])
              )
          );
        })
      );
  });

  return { routes, color };
};

const Home: React.FC = () => {
  const { routes, color } = useLogic();

  const Map = useMemo(
    () =>
      dynamic(
        () => import("components/map"), // replace '@components/map' with your component's location
        {
          loading: () => (
            <Center>
              <Spinner size="xl" />
            </Center>
          ),
          ssr: false, // This line is important. It's what prevents server-side render
        }
      ),
    [
      /* list variables which should trigger a re-render here */
    ]
  );

  return (
    <Center>
      <Box mx={2} mb={8} flex="1" w="100%" minW={350} maxW={1200} mt={5}>
        <Search placeholder="Buscar trilha pelo nome" />
        <Divider my={3} />
        <Heading mb={5}>Top 5 trilhas</Heading>
        <Tabs>
          <TabList>
            {routes.map((route, index) => (
              <Tab _focus={{ outline: "none" }} key={genKey()}>
                #{index + 1} Lugar
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {routes.map(route => (
              <TabPanel key={genKey()}>
                <Box mt={1} bgColor={color} borderRadius="0.375rem">
                  <LinkBox as="article" p="5" borderWidth="1px" rounded="md">
                    <Box mt={2} mx={5} borderRadius={5} mb={5}>
                      <Map
                        route={route}
                        reference={
                          db
                            .collection("routes")
                            .doc(route.id) as firebase.firestore.DocumentReference<IRoute>
                        }
                      />
                    </Box>
                    {route?.updated_at ? (
                      <Box as="time" dateTime={route && route.updated_at.toDate().toUTCString()}>
                        {route &&
                          `Atualizado há ${formatDistance(new Date(), route.updated_at.toDate(), {
                            locale: ptBR,
                          })} atrás`}
                      </Box>
                    ) : (
                      <Box as="time" dateTime={route && route.created_at.toDate().toUTCString()}>
                        {route &&
                          `Criado há ${formatDistance(new Date(), route.created_at.toDate(), {
                            locale: ptBR,
                          })} atrás`}
                      </Box>
                    )}
                    <Heading size="md" my="2">
                      <Link href={route.href}>{route && route.name}</Link>
                    </Heading>
                    <Text mb="3">{route && route.details}</Text>
                    <Link href={route.href}>
                      <Box as="a" color="teal.400" href={route.href} fontWeight="bold">
                        Clique aqui para se aventurar
                      </Box>
                    </Link>
                  </LinkBox>
                </Box>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </Box>
    </Center>
  );
};

export default Home;
