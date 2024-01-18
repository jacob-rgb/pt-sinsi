import { IPagination } from "./pagination.model";
import { IUser } from "./user.model";
import { IFinalVideo } from "./video-response.model";

export interface IStateContext {
  auth: AuthState;
  videos: VideosState;
  login: (user: IUser) => void;
  setListAndPagination: (list: IFinalVideo[], pagination: IPagination) => void;
  setVideosList: (videos: IFinalVideo[]) => void;
  setPagination: ({nextToken, prevToken, totalElements }: IPagination ) => void;
}

export interface AuthState {
  isLogged: boolean;
  user: IUser | null;
}

export interface VideosState {
  pagination: IPagination
  list: IFinalVideo[] | null;
}
