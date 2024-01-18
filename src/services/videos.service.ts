import { IPagination } from "../models/pagination.model";
import {
  IFinalVideo,
  IVideoResponseItem,
  IVideoResponseItemWithDetail,
} from "../models/video-response.model";

export interface IGetVideosByChannelReturn {
  list: IFinalVideo[];
  pagination: IPagination
}

export class VideosService {
  private static _apiKey = import.meta.env.VITE_YT_KEY;

  public static totalElements: number = 0;

  public static getVideosAndPaginationByChannelId = async (
    channelId: string,
    token: string | null = null
  ): Promise<IGetVideosByChannelReturn | undefined> => {
    try {
      if (channelId) {
        const {
          items: videosItems,
          nextPageToken,
          prevPageToken,
          pageInfo,
        } = await this.getVideosByChannelId(channelId, token);
        const allVideosIds = videosItems
          .map((video: IVideoResponseItem) => video.id.videoId)
          .join(",");
        const { items: videosItemsWithDetail } =
          await this.getVideosWithDetailsByIds(allVideosIds);
        return {
          list: this.mapVideoItems(videosItems, videosItemsWithDetail),
          pagination: {
            nextToken: nextPageToken,
            prevToken: prevPageToken || null,
            totalElements: pageInfo.totalResults,
          },
        };
      }
    } catch (error) {
      throw new Error("Error al cargar  canales");
    }
  };

  public static getChannelsByName = async (name: string) =>
    (
      await fetch(
        `https://www.googleapis.com/youtube/v3/search?part=id,snippet&q=${name}&key=${this._apiKey}`
      )
    ).json();
    
  private static getVideosByChannelId = async (channelId: string, token?: string | null) => {
      let endpoint = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&key=${this._apiKey}&maxResults=10&order=date`;
      if (token) endpoint += `&pageToken=${token}`
      const toReturn = (await fetch(endpoint)).json();
      return toReturn
  }
  private static getVideosWithDetailsByIds = async (allVideosIds: string[]) =>
    (
      await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,statistics,topicDetails,snippet&id=${allVideosIds}&key=${this._apiKey}`
      )
    ).json();

  private static mapVideoItems = (
    videos: IVideoResponseItem[],
    videosWithDetail: IVideoResponseItemWithDetail[]
  ): IFinalVideo[] => {
    const finalVideos: IFinalVideo[] = videos.map((video) => {
      const itemWithDetails = videosWithDetail.find(
        (vd) => vd.id === video.id.videoId
      );
      return {
        ...video,
        contentDetails: itemWithDetails?.contentDetails,
        statistics: itemWithDetails?.statistics,
        topicDetails: itemWithDetails?.topicDetails,
      };
    }) as IFinalVideo[];
    return finalVideos;
  };
}
