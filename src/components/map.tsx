import { MapContainer, TileLayer, Polyline, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import genKey from "utils/genKey";
import React, { useRef, useState } from "react";
import L, { PathOptions } from "leaflet";
import { IPointer, pointerIcon, pointerColor } from "helper/pointer";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  HStack,
  Input,
  Stack,
  Text,
  useClipboard,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";

import { ShareIcon } from "helper/icon";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  RedditShareButton,
  RedditIcon,
  TelegramShareButton,
  TelegramIcon,
  EmailShareButton,
  EmailIcon,
} from "react-share";
import { StarIcon } from "@chakra-ui/icons";
import firebase from "utils/firebase";

const _chunkSize = 2;
function sliceInChunks(original: { lat: number; lng: number }[]): { lat: number; lng: number }[][] {
  return original.map((_value, i) => original.slice(i, i + _chunkSize));
}

function getChunks(
  coordenatesArray: { lat: number; lng: number }[]
): { lat: number; lng: number }[][] {
  return coordenatesArray.length % 2
    ? sliceInChunks(coordenatesArray).slice(0, -1)
    : sliceInChunks(coordenatesArray);
}

function getDistanceInMeters(coordenatesArray: { lat: number; lng: number }[]): number {
  return getChunks(coordenatesArray)
    .map(coordenates => L.latLng(coordenates[0].lat, coordenates[0].lng).distanceTo(coordenates[1]))
    .reduce((v, vv) => v + vv);
}

function getDistanceInKm(coordenatesArray: { lat: number; lng: number }[]): number {
  return getDistanceInMeters(coordenatesArray) / 1000;
}

function normalizeDistance(distance: number): string {
  return distance.toPrecision(2).toLocaleString();
}

type IBadges = "university" | "green" | "products";

export interface IRoute {
  details: string;
  avatar_url: string;
  name: string;
  description: string;
  badges: Array<IBadges>;
  pointers: {
    type: IPointer;
    name: string;
    avatar_url: string;
    alias: string;
    pos: {
      lat: number;
      lng: number;
    };
  }[];
  positions: {
    lat: number;
    lng: number;
  }[];
  created_at: firebase.firestore.Timestamp;
  updated_at?: firebase.firestore.Timestamp;
}
interface Props {
  route: IRoute;
  reference: firebase.firestore.DocumentReference<IRoute>;
}

const badges = {
  university: {
    variant: "solid",
    colorScheme: "facebook",
    children: "universitária",
  },
  green: { variant: "solid", colorScheme: "green", children: "verde" },
  products: { variant: "solid", colorScheme: "yellow", children: "produtos" },
};

const Map: React.FC<Props> = ({ route, reference }: Props) => {
  const { hasCopied, onCopy } = useClipboard(window.location.href);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);
  const color = useColorModeValue("gray.800", "white");

  const [polyline] = useState({
    pathOptions: { color: "lime", opacity: 0.5, weight: 5 } as PathOptions,
    positions: route.positions,
  });

  function LocationMarker(): null {
    // useMapEvent("click", e=>{
    //     console.log(polylines[0].positions);
    //     setPolylines([
    //         {
    //             ...polylines[0],
    //             positions: [
    //                 ...polylines[0].positions,
    //                 e.latlng
    //             ],
    //         }
    //     ]);
    // })
    return null;
  }

  const Info: React.FC = () => {
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

  const title = "Rota incrível, confira neste link";

  return (
    <Box top={0} left={0} margin={0} padding={0} width="100%" height="40vh">
      <AlertDialog
        motionPreset="slideInBottom"
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent mx={2}>
          <AlertDialogHeader>Compartilhar</AlertDialogHeader>
          <AlertDialogBody>
            <Flex mb={2}>
              <Input value={window.location.href} isReadOnly placeholder="link" />
              <Button onClick={onCopy} ml={2}>
                {hasCopied ? "Copiado" : "Copiar"}
              </Button>
            </Flex>
          </AlertDialogBody>
          <AlertDialogFooter>
            <Flex mb={2} width="100%">
              <Center flex={1}>
                <FacebookShareButton url={window.location.href} title={title}>
                  <FacebookIcon size={32} style={{ minWidth: 30 }} round />
                </FacebookShareButton>
              </Center>

              <Center flex={1}>
                <WhatsappShareButton url={window.location.href} title={title}>
                  <WhatsappIcon size={32} style={{ minWidth: 30 }} round />
                </WhatsappShareButton>
              </Center>

              <Center flex={1}>
                <TwitterShareButton url={window.location.href} title={title}>
                  <TwitterIcon size={32} style={{ minWidth: 30 }} round />
                </TwitterShareButton>
              </Center>

              <Center flex={1}>
                <RedditShareButton url={window.location.href} title={title}>
                  <RedditIcon size={32} style={{ minWidth: 30 }} round />
                </RedditShareButton>
              </Center>

              <Center flex={1}>
                <TelegramShareButton url={window.location.href} title={title}>
                  <TelegramIcon size={32} style={{ minWidth: 30 }} round />
                </TelegramShareButton>
              </Center>

              <Center flex={1}>
                <EmailShareButton url={window.location.href} title={title}>
                  <EmailIcon size={32} style={{ minWidth: 30 }} round />
                </EmailShareButton>
              </Center>
            </Flex>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <MapContainer
        center={polyline.positions[0]}
        zoom={14}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Polyline {...polyline} />
        {route.pointers.map(pointer => (
          <div key={genKey()}>
            <Marker position={pointer.pos} icon={pointerIcon(pointer.type)}>
              <Popup>
                <Center margin={2}>
                  <Avatar src={pointer.avatar_url} />
                </Center>
                <Center>{pointer.name}</Center>
                <Divider marginY={0.5} bgColor="#666" />
                <Center>
                  <Text
                    fontWeight="bold"
                    margin="0px !important"
                    color={pointerColor(pointer.type)}
                  >
                    {pointer.alias}
                  </Text>
                </Center>
              </Popup>
            </Marker>
            <LocationMarker />
          </div>
        ))}
        <Info />
      </MapContainer>
    </Box>
  );
};

export default Map;
