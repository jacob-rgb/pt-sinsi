import { IVideo } from "./video.model";

export interface IVideoResponseItem {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  kind: string;
  snippet: IVideo;
}

export interface IFinalVideo {
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  kind: string;
  snippet: IVideo;
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    regionRestriction: {
      allowed: string[];
      blocked: string[];
    };
    contentRating: {
      // ... (abbreviated for brevity)
    };
    projection: string;
    hasCustomThumbnail: boolean;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
  topicDetails: {
    topicIds: string[];
    relevantTopicIds: string[];
    topicCategories: string[];
  };
}

export interface IVideoResponseItemWithDetail {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      [key: string]: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    tags: string[];
    categoryId: string;
    liveBroadcastContent: string;
    defaultLanguage: string;
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage: string;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: boolean;
    regionRestriction: {
      allowed: string[];
      blocked: string[];
    };
    contentRating: {
      // ... (abbreviated for brevity)
    };
    projection: string;
    hasCustomThumbnail: boolean;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
  topicDetails: {
    topicIds: string[];
    relevantTopicIds: string[];
    topicCategories: string[];
  };
}

export interface IVideoResponse {
  etag: string;
  items: IVideoResponseItem[];
  kind: string;
  nextPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  regionCode: string;
}
