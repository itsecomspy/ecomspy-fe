import styled from "styled-components";
import { Chart } from "../Chart";
import { useLocation } from "react-router-dom";
import useKeywords from "@root/src/hooks/use-keywords";
import { Loader } from "../..";

export const KeywordsTab = () => {
  const location = useLocation();
  const [, parent, child] = location.pathname.substring(1).split("/");

  const { keywords, isLoading } = useKeywords({
    categoryId: 0,
    values: {
      parent,
      child,
    },
  });

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : keywords?.length === 0 ? (
        <p>No data</p>
      ) : (
        keywords?.map((product, index: number) => {
          const trendLine = JSON.parse(product.trendData || "{}") as {
            default: {
              timelineData: {
                time: string;
                formattedTime: string;
                formattedAxisTime: string;
                value: number[];
                formattedValue: string[];
                hasData: boolean[];
              }[];
            };
          };
          const chartData: {
            name: string;
            amt: string;
            pv: number;
            uv: string;
          }[] = trendLine.default.timelineData.map((t) => {
            return {
              name: t.formattedTime,
              amt: t.formattedTime.split(",")[1],
              pv: t.value[0],
              uv: t.formattedTime.split(",")[0],
            };
          });

          return (
            <Chart
              key={index}
              height={225}
              width={275}
              margin={{ t: 64, l: 16, r: 0, b: 0 }}
              chartData={chartData}
              name={product.query}
            />
          );
        })
      )}
    </>
  );
};
