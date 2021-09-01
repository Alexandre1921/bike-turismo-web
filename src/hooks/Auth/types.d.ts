import React from "react";

import firebase from "utils/firebase";

export interface IState {
  userDataPresent: boolean;
  user: firebase.User | null;
  listener: firebase.Unsubscribe | null;
}

export interface AuthContextData {
  user?: firebase.User | null;
  userDataPresent: boolean;
  signOut: () => void;
}

export interface AuthProviderProps {
  children: React.ReactNode;
}

export interface IuseLogicReturn {
  signOut: () => void;
  authState: IState;
}
