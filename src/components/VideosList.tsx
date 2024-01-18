import { DataView } from "primereact/dataview";
import { Button } from "primereact/button";
import {
  IFinalVideo,
  IVideoResponseItem,
} from "../models/video-response.model";
import { Paginator, PaginatorPageChangeEvent } from "primereact/paginator";

interface Props {
  videos: IFinalVideo[];
  totalElemnts: number;
  first: number;
  handlePagination: (e: PaginatorPageChangeEvent) => void;
}

export const VideosList = ({ videos, totalElemnts, first, handlePagination }: Props) => {
  const handleGoToYoutube = (videoId: string, videoChannel: string) => {
    window.open(
      `https://www.youtube.com/watch?v=${videoId}&ab_channel=${videoChannel}`,
      "_blank"
    );
  };
  const itemTemplate = ({
    snippet: video,
    id: { videoId },
  }: IVideoResponseItem) => {
    return (
      <div className="col-12">
        <div className="flex flex-wrap p-4 gap-4">
          <img
            className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            src={video.thumbnails?.default.url}
            alt={video.title}
          />
          <div className="flex flex-column sm:flex-row justify-content-between  flex-1 gap-4">
            <div className="flex flex-column gap-3">
              <div className="text-2xl font-bold text-900 text-left">
                {video.title}
              </div>
              <div className="flex gap-3">
                <span className="flex gap-2">
                  <span
                    className="font-semibold text-left"
                    dangerouslySetInnerHTML={{ __html: video.description }}
                  ></span>
                </span>
              </div>
            </div>
            <div className="flex align-items-center gap-3 sm:gap-2">
              <Button
                icon="pi pi-youtube"
                className="p-button-rounded"
                onClick={() => handleGoToYoutube(videoId, video.channelId)}
              ></Button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="card">
      <DataView
        value={videos}
        itemTemplate={itemTemplate}
        rows={10}
        paginator
        paginatorTemplate={{
          layout:  "PageLinks",
          PageLinks: <CustomPaginator first={first} totalElems={totalElemnts} handlePagination={handlePagination} />
        }}
        paginatorPosition={'both'}
      />
    </div>
  );
};

const CustomPaginator = ({
  first,
  totalElems = 0,
  handlePagination,
}: {
  first: number;
  totalElems: number;
  handlePagination: Props["handlePagination"];
}) => {
  return (
    <Paginator
      first={first}
      rows={10}
      template={{
        layout: "PrevPageLink CurrentPageReport NextPageLink",
      }}
      totalRecords={(totalElems || 0) / 10}
      rowsPerPageOptions={[10]}
      onPageChange={handlePagination}
    />
  );
};
