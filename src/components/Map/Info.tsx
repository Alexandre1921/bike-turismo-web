import genKey from "utils/genKey";
import React from "react";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { ShareIcon } from "helper/icon";
import { StarIcon } from "@chakra-ui/icons";
import firebase from "utils/firebase";
import { PathOptions } from "leaflet";
import { badges, getDistanceInKm, normalizeDistance } from "./helpers";
import { IRoute } from "./types";

interface Props {
  reference: firebase.firestore.DocumentReference<IRoute>;
  route: IRoute;
  polyline: {
    pathOptions: PathOptions;
    positions: {
      lat: number;
      lng: number;
    }[];
  };
}

const Info: React.FC<Props> = ({ reference, route, polyline }: Props) => {
  const { onOpen } = useDisclosure();
  const color = useColorModeValue("gray.800", "white");

  const handleOnClickStar = (): void => {
    reference.update("stars", firebase.firestore.FieldValue.increment(1));
  };

  return (
    <div className="leaflet-top leaflet-right">
      <Box
        padding={2}
        maxWidth={400}
        bg="gray.500"
        borderRadius={5}
        margin={2}
        minWidth={250}
        className="leaflet-bar leaflet-control"
      >
        <Accordion allowToggle>
          <AccordionItem>
            <h2>
              <AccordionButton _focus={{ outline: "none" }}>
                <Box flex="1" textAlign="left">
                  Mais informações
                </Box>
                <AccordionIcon />
              </AccordionButton>
            </h2>
            <AccordionPanel>
              <Stack direction="row">
                {route.badges.map(badge => (
                  <Badge {...badges[badge]} key={genKey()} />
                ))}
              </Stack>
              <Divider marginY={2} />
              <Flex>
                <Avatar src={route.avatar_url} />
                <Box ml="3">
                  <HStack direction="row">
                    <Text fontWeight="bold">{route.name}</Text>
                    <Badge ml="1" colorScheme="green">
                      Nova
                    </Badge>
                  </HStack>
                  <Text fontSize="sm">{route.description}</Text>
                </Box>
              </Flex>
              <Divider marginY={2} />
              <Flex>
                <HStack direction="row">
                  <Text fontSize="lg" fontWeight="bold">
                    Distância:
                  </Text>
                  <Text fontSize="sm">
                    {normalizeDistance(getDistanceInKm(polyline.positions))} km
                  </Text>
                </HStack>
              </Flex>
              <Center>
                <Flex>
                  <Button
                    onClick={onOpen}
                    direction="row"
                    cursor="pointer"
                    className="leaflet-bar leaflet-control"
                  >
                    <Text fontSize="md" fontWeight="bold">
                      Compartilhar
                    </Text>
                    <Divider marginX={2} />
                    <ShareIcon fill={color} />
                  </Button>
                  <Button
                    onClick={handleOnClickStar}
                    direction="row"
                    cursor="pointer"
                    className="leaflet-bar leaflet-control"
                  >
                    <StarIcon fill={color} />
                  </Button>
                </Flex>
              </Center>
            </AccordionPanel>
          </AccordionItem>
        </Accordion>
      </Box>
    </div>
  );
};

export default Info;
