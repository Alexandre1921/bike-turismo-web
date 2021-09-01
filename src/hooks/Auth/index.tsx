import React, { createContext, useContext } from "react";
import useLogic from "./logic";

import { AuthContextData, AuthProviderProps } from "./types";

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

const AuthProvider: React.FC<AuthProviderProps> = ({ children }: AuthProviderProps) => {
  const { authState, signOut } = useLogic();

  return (
    <AuthContext.Provider
      value={{
        user: authState.user,
        userDataPresent: authState.userDataPresent,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}

export { AuthProvider, useAuth };
