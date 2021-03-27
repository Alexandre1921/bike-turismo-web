import { MapContainer, TileLayer, Polyline, useMapEvent, Marker, Popup } from "react-leaflet";
import 'leaflet/dist/leaflet.css';
import genKey from "utils/genKey";
import { useState } from "react";
import { PathOptions } from "leaflet";
import route from "routes/utfpr.json";
import { pointer } from "assets/pointer";
import { Center, Divider } from "@chakra-ui/react";
import L from 'leaflet';

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

const Map = () => {
    const position = { lat: -25.721454, lng: -53.0833871 };

    const [ polylines, setPolylines ] = useState([
        {
            pathOptions: { color: 'lime', opacity:0.5, weight: 5 } as PathOptions,
            positions: route,
        }
    ]);

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
      
    return (
        <MapContainer center={position} zoom={14} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {polylines.map(polyline => <Polyline {...polyline} key={genKey()} />)}
            {[route[0], route[route.length-1]].map((pointerPos, index) => 
                <div key={genKey()}>
                    <Marker position={pointerPos} icon={pointer}>
                        <Popup>
                            {index===0 ? <>Começo da rota<Divider marginY={0.5} bgColor="#666" /><Center>UTFPR</Center></> : <>Fim da rota<Divider marginY={0.5} bgColor="#666" /><Center>UTFPR</Center></>}
                        </Popup>
                    </Marker>
                    <LocationMarker/>
                </div>
            )}
        </MapContainer>
    );
};

export default Map;
