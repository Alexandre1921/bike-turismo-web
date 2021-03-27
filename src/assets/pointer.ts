import L from 'leaflet';

const pointer = new L.Icon({
    iconUrl: '../pointer.svg',
    iconRetinaUrl: '../pointer.svg',
    iconSize: new L.Point(24, 28),
    iconAnchor: [12, 24],
    popupAnchor: [0, -20],
    className: '',
});

export { pointer };