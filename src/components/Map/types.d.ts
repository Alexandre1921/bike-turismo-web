import { IPointer } from "helper/pointer";

export type IBadges = "university" | "green" | "products";

export interface IRoute {
  details: string;
  avatar_url: string;
  name: string;
  description: string;
  badges: Array<IBadges>;
  pointers: {
    type: IPointer;
    name: string;
    avatar_url: string;
    alias: string;
    pos: {
      lat: number;
      lng: number;
    };
  }[];
  positions: {
    lat: number;
    lng: number;
  }[];
  created_at: firebase.firestore.Timestamp;
  updated_at?: firebase.firestore.Timestamp;
}

export interface Props {
  route: IRoute;
  reference: firebase.firestore.DocumentReference<IRoute>;
}

export interface ICoordinate {
  lat: number;
  lng: number;
}
