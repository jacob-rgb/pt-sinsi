import { useContext, useEffect, useState } from "react";
import { StateContext } from "../state/state";
import { Chart } from "primereact/chart";
import { ChartData, ChartOptions } from "chart.js";
import { Dropdown } from "primereact/dropdown";
import { IFinalVideo } from "../models/video-response.model";

const getChartDataAndOtions = (
  documentStyle: CSSStyleDeclaration,
  labels: string[],
  list: IFinalVideo[]
) => {
  const data: ChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Visitas',
        data: list.map(item => parseInt(item.statistics.viewCount)),
        backgroundColor: documentStyle.getPropertyValue("--blue-500"),
        hoverBackgroundColor: documentStyle.getPropertyValue("--blue-300"),
      },
      {
        label: 'Likes',
        data: list.map(item => parseInt(item.statistics.likeCount)),
        backgroundColor: documentStyle.getPropertyValue("--yellow-500"),
        hoverBackgroundColor: documentStyle.getPropertyValue("--yellow-300"),
      },
      {
        label: 'Comentarios',
        data: list.map(item => parseInt(item.statistics.commentCount)),
        backgroundColor: documentStyle.getPropertyValue("--green-500"),
        hoverBackgroundColor: documentStyle.getPropertyValue("--green-300"),
      },
    ],
  };
  const options: ChartOptions = {
    plugins: {
      legend: {
        labels: {
          
          usePointStyle: true,
        },
      },
    },
  };

  return { data, options };
};

export const VideosStats = () => {
  const { videos } = useContext(StateContext);

  const [chartMode, SetChartMode] = useState("bar");
  const [barData, setBarData] = useState(
    {} as { data: ChartData; options: ChartOptions }
  );

  useEffect(() => {
    const documentStyle = getComputedStyle(document.body);
    const titles = videos.list?.map((video) => video.snippet.title) || [];

    const { data: viewsData, options: viewsOptions } = getChartDataAndOtions(
      documentStyle,
      titles,
      videos.list || []
    );

    setBarData({ data: viewsData, options: viewsOptions });
  }, [videos]);
  return (
    <div>
      <h2 className="text-center">
        <span className="mr-2">Analizar Datos (Gráfica) </span>
        <Dropdown
          value={chartMode}
          onChange={(e) => SetChartMode(e.value)}
          options={[
            { name: 'Horizontal (barras)', value: 'bar'},
            { name: 'Circular', value: 'pie'},
          ]}
          optionLabel="name"
          optionValue="value"
          placeholder="Mode de visualización"
        />
      </h2>
      <Chart  type={chartMode} data={barData.data} options={barData.options}  className={"mode_" + chartMode} />
    </div>
  );
};
