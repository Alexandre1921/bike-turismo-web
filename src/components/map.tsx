import { MapContainer, TileLayer, Polyline, useMapEvent, Marker, Popup, LayersControl, LayerGroup, Circle, FeatureGroup, Rectangle } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import genKey from "utils/genKey";
import { useRef, useState } from "react";
import { PathOptions } from "leaflet";
import route from "routes/utfpr.json";
import { pointer } from "helper/pointer";
import { AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogOverlay, Avatar, Badge, Box, Button, Center, Divider, Flex, HStack, Input, Stack, Text, useClipboard, useColorModeValue, useDisclosure } from "@chakra-ui/react";
import L from 'leaflet';
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

const _chunkSize = 2;
function sliceInChunks(original: { lat: number;lng: number; }[]): { lat: number;lng: number; }[][]  {
    return original.map((_value, i) => original.slice(i, i + _chunkSize));
}

function getChunks(coordenatesArray: { lat: number;lng: number; }[]): { lat: number;lng: number; }[][] {
    return coordenatesArray.length%2 ? sliceInChunks(coordenatesArray).slice(0,-1) : sliceInChunks(coordenatesArray);
}

function getDistanceInMeters(coordenatesArray: { lat: number;lng: number; }[]) {
    return getChunks(coordenatesArray).map(coordenates =>
        L.latLng(coordenates[0].lat, coordenates[0].lng).distanceTo(coordenates[1])
    ).reduce((v,vv)=>v+vv);
}

function getDistanceInKm(coordenatesArray: { lat: number;lng: number; }[]) {
    return getDistanceInMeters(coordenatesArray)/1000;
}

function normalizeDistance(distance: number) {
    return distance.toPrecision(2).toLocaleString();
}

const Map = () => {
    const { hasCopied, onCopy } = useClipboard(window.location.href);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const cancelRef = useRef(null);
    const color = useColorModeValue("gray.800", "white")

    const position = { lat: -25.721454, lng: -53.0833871 };

    const [ polyline, setPolylines ] = useState(
        {
            pathOptions: { color: 'lime', opacity:0.5, weight: 5 } as PathOptions,
            positions: route.positions,
        }
    );

    function LocationMarker() {
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

    function Info() {
        return (
          <div className="leaflet-top leaflet-right">
            <Box padding={2} maxWidth={400} bg="gray.500" borderRadius={5} margin={2} minWidth={250}>
                <Stack direction="row">
                    <Badge variant="solid" colorScheme="facebook">
                        universitária
                    </Badge>
                    <Badge variant="solid" colorScheme="green">
                        verde
                    </Badge>
                    <Badge variant="solid" colorScheme="yellow">
                        produtos
                    </Badge>
                </Stack>
                <Divider marginY={2} />
                <Flex>
                    <Avatar src="/assets/cachoeira.jpeg" />
                    <Box ml="3">
                        <HStack direction="row">
                            <Text fontWeight="bold">UTFPR</Text>
                            <Badge ml="1" colorScheme="green">
                                Nova
                            </Badge>
                        </HStack>
                        <Text fontSize="sm">Instituição de ensino</Text>
                    </Box>
                </Flex>
                <Divider marginY={2} />
                <Flex>
                    <HStack direction="row">
                        <Text fontSize="lg" fontWeight="bold">Distância:</Text>
                        <Text fontSize="sm">{normalizeDistance(getDistanceInKm(polyline.positions))} km</Text>
                    </HStack>
                </Flex>
                <Center>
                    <Flex>
                        <Button onClick={onOpen} direction="row" cursor="pointer" className="leaflet-bar leaflet-control">
                            <Text fontSize="md" fontWeight="bold">Compartilhe</Text>
                            <Divider marginX={2}></Divider>
                            <ShareIcon fill={color}></ShareIcon>
                        </Button>
                    </Flex>
                </Center>
            </Box>
          </div>
        )
    }
      
    return (
        <Box top={"-2rem"} left={0} margin={0} padding={0} position="absolute" width="100%" height="100vh">
            <AlertDialog
                motionPreset="slideInBottom"
                leastDestructiveRef={cancelRef}
                onClose={onClose}
                isOpen={isOpen}
                isCentered
            >
                <AlertDialogOverlay />

                <AlertDialogContent>
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
                        <Flex mb={2} width={"100%"}>
                            <Center flex={1}>
                                <FacebookShareButton
                                        url={window.location.href}
                                        title="Rota massa do bike turismo"
                                    >
                                    <FacebookIcon size={32} style={{minWidth:30}} round />
                                </FacebookShareButton>
                            </Center>
                            
                            <Center flex={1}>
                                <WhatsappShareButton
                                    url={window.location.href}
                                    title="Rota massa do bike turismo"
                                >
                                    <WhatsappIcon size={32} style={{minWidth:30}} round />
                                </WhatsappShareButton>
                            </Center>

                            <Center flex={1}>
                                <TwitterShareButton
                                    url={window.location.href}
                                    title="Rota massa do bike turismo"
                                >
                                    <TwitterIcon size={32} style={{minWidth:30}} round />
                                </TwitterShareButton>
                            </Center>

                            <Center flex={1}>
                                <RedditShareButton
                                    url={window.location.href}
                                    title="Rota massa do bike turismo"
                                >
                                    <RedditIcon size={32} style={{minWidth:30}} round />
                                </RedditShareButton>
                            </Center>

                            <Center flex={1}>
                                <TelegramShareButton
                                    url={window.location.href}
                                    title="Rota massa do bike turismo"
                                >
                                    <TelegramIcon size={32} style={{minWidth:30}} round />
                                </TelegramShareButton>
                            </Center>

                            <Center flex={1}>
                                <EmailShareButton
                                    url={window.location.href}
                                    title="Rota massa do bike turismo"
                                >
                                    <EmailIcon size={32} style={{minWidth:30}} round />
                                </EmailShareButton>
                            </Center>
                        </Flex>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <MapContainer center={position} zoom={14} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Polyline {...polyline} />
                {[polyline.positions[0], polyline.positions[polyline.positions.length-1]].map((pointerPos, index) => 
                    <div key={genKey()}>
                        <Marker position={pointerPos} icon={pointer()}>
                            <Popup>
                                {index===0 ? 
                                <>
                                    <Center margin={2}>
                                        <Avatar src="/assets/centroNorte.jpg" />
                                    </Center>
                                    <Center>Centro Norte</Center>
                                    <Divider marginY={0.5} bgColor="#666" />
                                    <Center>
                                        <Text fontWeight="bold" margin={"0px !important"}>Começo da rota</Text>
                                    </Center>
                                    
                                    
                                </> 
                                : <>
                                    <Center margin={2}>
                                        <Avatar src="/assets/utfpr.png" />
                                    </Center>
                                    <Center>UTFPR</Center>
                                    <Divider marginY={0.5} bgColor="#666" />
                                    <Center>
                                        <Text fontWeight="bold" margin={"0px !important"}>Fim da rota</Text>
                                    </Center>
                                </>}
                            </Popup>
                        </Marker>
                        <LocationMarker/>
                    </div>
                )}
                {route.pointers.honey.map(pointerPos => 
                    <div key={genKey()}>
                        <Marker position={pointerPos} icon={pointer("honey")}>
                            <Popup>
                                <Center margin={2}>
                                    <Avatar src="/assets/vendaMel.jpeg" />
                                </Center>
                                <Center>loja do zé</Center>
                                <Divider marginY={0.5} bgColor="#666" />
                                <Center>
                                    <Text fontWeight="bold" margin={"0px !important"} color="yellow.500">Venda de mel</Text>
                                </Center>
                            </Popup>
                        </Marker>
                        <LocationMarker/>
                    </div>
                )}
                {route.pointers.green.map(pointerPos => 
                    <div key={genKey()}>
                        <Marker position={pointerPos} icon={pointer("green")}>
                            <Popup>
                                <Center margin={2}>
                                    <Avatar src="/assets/cachoeira.jpeg" />
                                </Center>
                                <Center>Cachoeira maravilha</Center>
                                <Divider marginY={0.5} bgColor="#666" />
                                <Center>
                                    <Text fontWeight="bold" margin={"0px !important"} color="green">Beleza natural</Text>
                                </Center>
                            </Popup>
                        </Marker>
                        <LocationMarker/>
                    </div>
                )}
                <Info/>
            </MapContainer>
        </Box>
    );
};

export default Map;
