import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel } from "@chakra-ui/accordion";
import { useColorModeValue } from "@chakra-ui/color-mode";
import { Box, Center, Divider, Heading, LinkBox, LinkOverlay, Text  } from "@chakra-ui/layout";
import { Portal } from "@chakra-ui/portal";
import { Spinner } from "@chakra-ui/spinner";
import { Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/stat";
import { Tab, TabList, TabPanel, TabPanels, Tabs } from "@chakra-ui/tabs";
import { IRoute } from "components/map";

import Search from "components/Search";
import { formatDistance } from "date-fns";
import dynamic from "next/dynamic";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import firebase, { db, storage } from "utils/firebase";
import { presentDate } from "utils/formatDate";
import BrazilianLocale from "date-fns/locale/pt-BR";


const Home = () => {
  const mapId ="xXLSMAvhyOKFXR4TFV2P";
  const [routes, setRoutes] = useState<Array<IRoute>>([]);
  const ref = useRef(null);
  console.log(ref.current);
  const href = `/map?mapId=${mapId}`;

  useEffect(()=>{
    mapId && db.collection("routes").orderBy("stars").limit(5).get()
    .then(query => query.empty ? Promise.reject("Nenhuma rota encontrada") : query.docs)
    .then(docs => docs.map(doc => {
      const data = doc.data() as IRoute;
      const getDownloadUrl = (avatar_url: string) => storage.ref(`/routes/${mapId}/${avatar_url}`).getDownloadURL();
      
      Promise.all(data.pointers.map(pointer => getDownloadUrl(pointer.avatar_url)))
      .then(pointersUrl => 
        getDownloadUrl(data.avatar_url)
        .then(res =>
          setRoutes(oldRoutes => ([...oldRoutes, {
            ...data,
            avatar_url: res,
            pointers: data.pointers.map((pointer, index) => ({...pointer, avatar_url: pointersUrl[index]}) )
          }]))
      ));
    }));
  }, [mapId]);

  // useEffect(()=>{
    // mapId && db.collection("routes").doc(mapId || "").get()
    // .then(doc => doc.exists ? doc.data() as IRoute : Promise.reject("Rota não encontrada"))
    // .then(data => Promise.all(
    //       data.pointers.map(pointer => 
    //         storage.ref(`/routes/${mapId}/${pointer.avatar_url}`)
    //         .getDownloadURL()
    //     )
    //   ).then((pointersUrl) => 
    //     storage.ref(`/routes/${mapId}/${data.avatar_url}`)
    //     .getDownloadURL()
    //     .then((res) =>
    //       setRoute({
    //         ...data,
    //         avatar_url: res,
    //         pointers: data.pointers.map((pointer, index) => ({...pointer, avatar_url: pointersUrl[index]}) )
    //       })
    //     )
    //   )
    // );
  // }, [mapId]);

  const Map = useMemo(() => dynamic(
    () => import('components/map'), // replace '@components/map' with your component's location
    { 
      loading: () => <Center><Spinner size="xl" /></Center>,
      ssr: false // This line is important. It's what prevents server-side render
    }
  ), [/* list variables which should trigger a re-render here */]);

  const color = useColorModeValue("white", "gray.800");
    console.log(routes);
  return (
    <Box mx={2} mb={8} flex="1">
      <Search placeholder="Buscar trilha pelo nome"/>
      <Divider my={3}></Divider>
      <Heading>Top 5 trilhas</Heading>
            <Tabs>
              <TabList>
                {routes.map((route, index) => <Tab _focus={{outline:"none"}} key={index}>#{index+1} Lugar</Tab>)}
              </TabList>
              <TabPanels>
              {routes.map((route, index)=>
                <TabPanel key={index}>
                <Box mt={2} mx={5} borderRadius={5}>
                  <Map route={route} reference={db.collection("routes").doc(mapId || "") as firebase.firestore.DocumentReference<IRoute>} />
                </Box>
                <Box mt={1} bgColor={color} borderRadius="0.375rem">
              <LinkBox as="article" p="5" borderWidth="1px" rounded="md">
                {route?.updated_at ? (
                  <Box as="time" dateTime={route && route.updated_at.toDate().toUTCString()}>
                    {route && "Atualizado há "+formatDistance(
                      new Date(),
                      route.updated_at.toDate(),
                      { locale: BrazilianLocale },
                    )+" atrás"}
                  </Box>
                ) : (
                  <Box as="time" dateTime={route && route.created_at.toDate().toUTCString()}>
                    {route && "Criado há "+formatDistance(
                      new Date(),
                      route.created_at.toDate(),
                      { locale: BrazilianLocale },
                    )+" atrás"}
                  </Box>
                )}
                <Heading size="md" my="2">
                  <Link href={href}>
                    <LinkOverlay href={href}>
                      {route && route.name}
                    </LinkOverlay>
                  </Link>
                </Heading>
                <Text mb="3">
                  {route && route.details}
                </Text>
                <Link href={href}>
                  <Box as="a" color="teal.400" href={href} fontWeight="bold">
                    Clique aqui para se aventurar
                  </Box>
                </Link>
              </LinkBox>
            </Box>
                </TabPanel>
              )}
              </TabPanels>
            </Tabs>
    </Box>
  );
};

export default Home;
