
export interface IThumbNail {
    height: number;
    width: number;
    url: string;
}

export interface IVideo {
    channelId : string;
    channelTitle: string;
    description: string;
    liveBroadcastContent: string;
    publishTime: string;
    publishedAt: string;
    thumbnails: {
        default: IThumbNail;
        high: IThumbNail;
        medium: IThumbNail;
    };
    title: string;
} 