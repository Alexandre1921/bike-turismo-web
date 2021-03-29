import L from 'leaflet';

export type IPointer = "green" | "honey" | "default" ;

export const pointerIcon = (icon: IPointer = "default") => {
    const getUrl = () => {
        switch (icon) {
            case "green":
                return '/assets/pointerGreen.svg';
            case "honey":
                return '/assets/pointerHoney.svg';
            default:
                return '/assets/pointer.svg';
        }
    }

    return new L.Icon({
        iconUrl: getUrl(),
        iconRetinaUrl: getUrl(),
        iconSize: new L.Point(50, 50),
        iconAnchor: [23, 47],
        popupAnchor: [2, -46],
        className: '',
    });
};

export const pointerColor = (icon: IPointer = "default") => {
    switch (icon) {
        case "green":
            return 'green';
        case "honey":
            return 'yellow.500';
        default:
            return '';
    }
};