/* eslint-disable react/prop-types */
import { AuthProvider } from "hooks/auth";
import React from "react";

const AppProvider: React.FC = ({ children }) => {
  return <AuthProvider>{children}</AuthProvider>;
};

export default AppProvider;
