import { MapContainer, TileLayer } from "react-leaflet";

const Map = () => {
    const position = {lat: 51.505, lng:-0.09};

    return (
        <div style={{ width:"200px", height:"200px" }}>
            <MapContainer center={position} zoom={13} scrollWheelZoom={false}>
                <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
            </MapContainer>
        </div>
        
    );
};

export default Map;
