import L from "leaflet";

export type IPointer = "green" | "honey" | "default";

interface PointerIconProps {
  iconUrl: string;
  iconRetinaUrl: string;
  iconSize: L.Point;
  iconAnchor: [number, number];
  popupAnchor: [number, number];
  className: string;
}

export function pointerIcon(icon: IPointer = "default"): L.Icon<PointerIconProps> {
  const getUrl = (): string => {
    switch (icon) {
      case "green":
        return "/assets/icons/pointers/pointerGreen.svg";
      case "honey":
        return "/assets/icons/pointers/pointerHoney.svg";
      default:
        return "/assets/icons/pointers/pointer.svg";
    }
  };

  return new L.Icon({
    iconUrl: getUrl(),
    iconRetinaUrl: getUrl(),
    iconSize: new L.Point(50, 50),
    iconAnchor: [23, 47],
    popupAnchor: [2, -46],
    className: "",
  });
}

export function pointerColor(icon: IPointer = "default"): string {
  switch (icon) {
    case "green":
      return "green";
    case "honey":
      return "yellow.500";
    default:
      return "";
  }
}

export default { pointerIcon, pointerColor };
