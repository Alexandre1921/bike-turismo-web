import { MapContainer, TileLayer } from "react-leaflet";

const Map = () => {
  return (
    <MapContainer zoom={13} scrollWheelZoom={false}>
        <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
    </MapContainer>
  );
};

export default Map;
