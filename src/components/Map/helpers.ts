import L from "leaflet";
import { ICoordinate } from "./types";

const _chunkSize = 2;
export function sliceInChunks(original: ICoordinate[]): ICoordinate[][] {
  return original.map((_value, i) => original.slice(i, i + _chunkSize));
}

export function getChunks(coordenatesArray: ICoordinate[]): ICoordinate[][] {
  return coordenatesArray.length % 2
    ? sliceInChunks(coordenatesArray).slice(0, -1)
    : sliceInChunks(coordenatesArray);
}

export function getDistanceInMeters(coordenatesArray: ICoordinate[]): number {
  return getChunks(coordenatesArray)
    .map(coordenates => L.latLng(coordenates[0].lat, coordenates[0].lng).distanceTo(coordenates[1]))
    .reduce((v, vv) => v + vv);
}

export function getDistanceInKm(coordenatesArray: ICoordinate[]): number {
  return getDistanceInMeters(coordenatesArray) / 1000;
}

export function normalizeDistance(distance: number): string {
  return distance.toPrecision(2).toLocaleString();
}

export const badges = {
  university: {
    variant: "solid",
    colorScheme: "facebook",
    children: "universitária",
  },
  green: { variant: "solid", colorScheme: "green", children: "verde" },
  products: { variant: "solid", colorScheme: "yellow", children: "produtos" },
};
