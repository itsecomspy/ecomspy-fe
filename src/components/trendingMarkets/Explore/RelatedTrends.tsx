import styled from "styled-components";
import { Trend } from ".";
import { data as _data } from "@/utils/_demoData";
import { Pagination } from "../..";
import React from "react";

const RelatedTrendsWrapper = styled.div`
  width: 100%;
  padding: 50px 16px;
  gap: 24px;
  display: flex;
  flex-direction: column;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.02);
  position: relative;
`;

const TrendsWrapper = styled.div`
  display: flex;
  padding: 0px 16px;
  align-items: center;
  flex-direction: column;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.02);
`;

export const RelatedTrends = ({
  trends,
}: {
  trends: {
    query: string;
    value: number;
    formattedValue: string;
    hasData: boolean;
    link: string;
    trendData: string;
  }[];
}) => {
  // Currently displayed items in pagination
  const [page, setPage] = React.useState<number>(1);
  let itemsToDisplay = 4;

  return (
    <RelatedTrendsWrapper>
      <p>Related Trends</p>
      <TrendsWrapper>
        {trends
          ?.slice(itemsToDisplay * (page - 1), itemsToDisplay * page)
          .map((trend, i) => {
            const trendLine = JSON.parse(trend.trendData || "{}") as {
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

            return (
              <Trend
                key={i}
                text={trend.query}
                border
                data={trendLine.default.timelineData.map((t) => {
                  return {
                    name: t.formattedTime,
                    amt: t.formattedTime.split(",")[1],
                    pv: t.value[0],
                    uv: t.formattedTime.split(",")[0],
                  };
                })}
              />
            );
          })}
      </TrendsWrapper>
      <Pagination
        currentItems={trends}
        itemsToDisplay={itemsToDisplay}
        page={page}
        setPage={setPage}
      />
    </RelatedTrendsWrapper>
  );
};
