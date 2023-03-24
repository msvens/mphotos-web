import { Guest, User, UXConfig } from "./api/types";
import PhotosApi from "./api/photoapi";
import React from "react";

export interface IMPContext {
  isGuest: boolean;
  guest: Guest;
  isGuestLoading: boolean;
  checkGuest: () => void;
  isUser: boolean;
  user: User;
  checkUser: () => void;
  uxConfig: UXConfig;
  checkUXConfig: () => void;
}

const dummyContext: IMPContext = {
  isGuest: false,
  isGuestLoading: false,
  guest: {
    name: "",
    email: "",
    verified: false,
    time: new Date(0).toISOString(),
  },
  checkGuest: () => {
    alert("dummy");
  },
  isUser: false,
  user: {
    name: "",
    bio: "",
    pic: "",
  },
  checkUser: () => {
    alert("dummy");
  },
  uxConfig: PhotosApi.defaultUxConfig,
  checkUXConfig: () => {
    alert("dummy");
  },
};

export const MPContext = React.createContext<IMPContext>(dummyContext);
