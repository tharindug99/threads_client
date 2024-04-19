"use client";
import React, { PropsWithChildren } from "react";
import { AuthProvider } from "./context/AuthContext";
import { Amplify, Storage } from "aws-amplify";
import awsconfig from "../aws-exports";
Amplify.configure(awsconfig);
function Providers({ children }: PropsWithChildren<any>) {
  return <AuthProvider>{children}</AuthProvider>;
}

export default Providers;
