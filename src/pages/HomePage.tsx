import { useState, useContext, useEffect } from "react";
import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import { VideosList } from "../components/VideosList";
import { StateContext } from "../state/state";
import { TabPanel, TabView } from "primereact/tabview";
import { VideosService } from "../services/videos.service";
import { PaginatorPageChangeEvent } from "primereact/paginator";
import "./HomePage.scss";
import { VideosStats } from "../components/VideosStats";

const HomePage: React.FC = () => {
  const { videos, setListAndPagination } = useContext(StateContext);

  const [channelName, setChannelName] = useState("");
  const [channelId, setChannelId] = useState("");
  const [first, setFirst] = useState(0);

  const handleChannelsSearch = async () => {
    try {
      if (channelName.length < 3) return;
      const { items: itemsByChannel } = await VideosService.getChannelsByName(
        channelName
      );
      const channelId = itemsByChannel[0]?.id?.channelId;
      if (channelId) {
        setChannelId(channelId);
        handleGetVideosByChannelId(channelId);
      }
    } catch (error) {
      throw new Error("Error al cargar  canales");
    }
  };

  const handlePageChange = (e: PaginatorPageChangeEvent) => {
    if (channelId.length) {
      if (e.first > first) {
        handleGetVideosByChannelId(channelId, videos.pagination.nextToken);
      } else {
        handleGetVideosByChannelId(channelId, videos.pagination.prevToken);
      }
    }
    setFirst(e.first);
  };

  const handleGetVideosByChannelId = async (
    channelId: string,
    token: string | null = null
  ) => {
    const videosInfo = await VideosService.getVideosAndPaginationByChannelId(
      channelId,
      token
    );
    if (videosInfo) {
      setListAndPagination(videosInfo.list, videosInfo.pagination);
    }
  };

  useEffect(() => {
    console.log(videos);
  }, [videos]);

  return (
    <div className="container">
      <div className="container-title">
        <h1 className="text-center mb-6">Listado de videos por canal</h1>
        <div className="flex justify-content-around gap-2 mb-2">
          <div className="flex gap-2 mb-2">
            <InputText
              placeholder="Nombre del canal"
              value={channelName}
              onChange={(e) => setChannelName(e.target.value)}
              onSubmit={handleChannelsSearch}
            />
            <Button
              icon="pi pi-search"
              severity="info"
              aria-label="Search"
              onClick={handleChannelsSearch}
            />
          </div>
          {/* <div className="flex gap-2 mb-2">
            {videos.list && (
              <Paginator
                first={first}
                rows={10}
                template={{
                  layout: "PrevPageLink CurrentPageReport NextPageLink",
                }}
                totalRecords={(videos.pagination.totalElements || 0) / 10}
                rowsPerPageOptions={[10]}
                onPageChange={handlePageChange}
              />
            )}
          </div> */}
        </div>
      </div>
      {videos.list && (
        <div className="flex">
          <TabView>
            <TabPanel header="Listado de videos">
              <VideosList
                videos={videos.list || []}
                totalElemnts={videos.pagination.totalElements || 0}
                first={first}
                handlePagination={handlePageChange}
              />
            </TabPanel>
            <TabPanel header="Estadísticas">
              <VideosStats />
            </TabPanel>
          </TabView>
        </div>
      )}
    </div>
  );
};

export default HomePage;
