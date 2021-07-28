import { MapContainer, TileLayer, Polyline, Marker, Popup, useMapEvent } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import genKey from "utils/genKey";
import React, { useRef, useState } from "react";
import { PathOptions } from "leaflet";
import { pointerIcon, pointerColor } from "helper/pointer";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Avatar,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Input,
  Text,
  useClipboard,
  useDisclosure,
} from "@chakra-ui/react";

import {
  FacebookIcon,
  FacebookShareButton,
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
import { IRoute, Props } from "./types";
import Info from "./Info";

import utf from "./utfpr.json";

const Map: React.FC<Props> = ({ route: Route, reference }: Props) => {
  const { hasCopied, onCopy } = useClipboard(window.location.href);
  const { isOpen, onClose } = useDisclosure();
  const cancelRef = useRef(null);

  const [route, setRoute] = useState<IRoute>(Route as IRoute);

  const polyline = {
    pathOptions: { color: "lime", opacity: 0.5, weight: 5 } as PathOptions,
    positions: route.positions,
  };

  function LocationMarker(): null {
    // useMapEvent("click", e => {
    //   const { lat, lng } = e.latlng;
    //   setRoute(oldRoute => {
    //     console.log(oldRoute, "----", {
    //       ...oldRoute,
    //       positions: [...oldRoute.positions, { lat, lng }],
    //     });
    //     return {
    //       ...oldRoute,
    //       positions: [...oldRoute.positions, { lat, lng }],
    //     };
    //   });
    // });
    return null;
  }

  const title = "Rota incrível, confira neste link";

  return (
    <Box width="100%" height="100%">
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
        style={{ height: "100%", width: "100%", minWidth: "100%", minHeight: "40vh" }}
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
        <Info polyline={polyline} reference={reference} route={route} />
      </MapContainer>
    </Box>
  );
};

export default Map;
