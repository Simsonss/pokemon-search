"use client";

import { ApolloProvider } from "@apollo/client/react";
import client from "@/lib/apolloClient";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
