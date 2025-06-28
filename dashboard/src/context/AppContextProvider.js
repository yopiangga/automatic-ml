import React from "react";

import { CombineComponents } from "./CombineComponents";
import { LoadingProvider } from "./LoadingContext";
import { PageProvider } from "./PageContext";
import { SidebarProvider } from "./SidebarContext";
import { UserProvider } from "./UserContext";

const providers = [
  UserProvider,
  PageProvider,
  LoadingProvider,
  SidebarProvider,
];
export const AppContextProvider = CombineComponents(...providers);
