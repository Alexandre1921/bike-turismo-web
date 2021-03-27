import { MapContainer, TileLayer } from "react-leaflet";
import 'leaflet/dist/leaflet.css';

const Map = () => {
    const position = {lat: 51.505, lng:-0.09};

    return (
        <MapContainer center={position} zoom={13} scrollWheelZoom={false} style={{ height: '100vh', width: '100wh' }}>
            <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
        </MapContainer>
    );
};

export default Map;
