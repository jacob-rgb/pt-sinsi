import { createContext, ReactElement, useState } from "react";
import bcrypt from "bcryptjs";
import {
  AuthState,
  IStateContext,
  VideosState,
} from "../models/state-context.model";
import { IUser } from "../models/user.model";
import { IFinalVideo } from "../models/video-response.model";
import { IPagination } from "../models/pagination.model";

export const StateContext = createContext<IStateContext>({} as IStateContext);

export const StateProvider = ({ children }: { children: ReactElement }) => {
  const [auth, setAuth] = useState<AuthState>({ isLogged: false, user: null });
  const [videos, setVideos] = useState<VideosState>({
    list: null,
    pagination: {
      totalElements: 0,
      nextToken: null,
      prevToken: null,
    },
  });

  const login = (user: IUser) => {
    const hashedPassword = bcrypt.hashSync(user.password, 10);
    user.password = hashedPassword;
    window.sessionStorage.setItem("_xuser", JSON.stringify(user));
    setAuth({
      isLogged: true,
      user: user,
    });
  };


  const setVideosList = (videoItems: IFinalVideo[] | null) => {
    console.log(videoItems)
    setVideos({
      ...videos,
      list: videoItems,
    });
  };

  const setPagination = (pagination: IPagination) => {
    setVideos({
      ...videos,
      pagination: pagination,
    });
  };

  const setListAndPagination = (list: IFinalVideo[], pagination: IPagination) => {
    setVideos({
      list,
      pagination
    });
  }


  return (
    <StateContext.Provider
      value={{
        auth,
        videos,
        login,
        setListAndPagination,
        setVideosList,
        setPagination
      }}
    >
      {children}
    </StateContext.Provider>
  );
};
