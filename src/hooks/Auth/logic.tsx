import { useCallback, useEffect, useState } from "react";

import { auth } from "utils/firebase";

import { IState, IuseLogicReturn } from "./types";

const initialState = {
  userDataPresent: false,
  user: null,
  listener: null,
};

function useLogic(): IuseLogicReturn {
  const [authState, setAuthState] = useState<IState>(initialState);

  useEffect(() => {
    if (authState.listener == null) {
      setAuthState({
        ...authState,
        listener: auth.onAuthStateChanged(user => {
          if (user) {
            setAuthState(oldState => ({
              ...oldState,
              userDataPresent: true,
              user,
            }));
          } else {
            setAuthState(oldState => ({
              ...oldState,
              userDataPresent: true,
              user: null,
            }));
          }
        }),
      });
    }
    return () => {
      if (authState.listener) authState.listener();
    };
  }, [authState]);

  const signOut = useCallback((): void => {
    auth.signOut();
    setAuthState(initialState);
  }, [setAuthState]);

  return { signOut, authState };
}

export default useLogic;
