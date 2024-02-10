import styled from "styled-components";
import { Trend } from ".";
import { data as _data } from "@/utils/_demoData";

const RelatedTrendsWrapper = styled.div`
  width: 100%;
  padding: 16px;
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
  const relatedTrendsData = [
    { text: "Binance Cash", data: _data },
    { text: "Ethereum Cash", data: _data },
    { text: "BNB Cash", data: _data },
    { text: "Bitcon Cash", data: _data },
  ];

  return (
    <RelatedTrendsWrapper>
      <p>Related Trends</p>
      <TrendsWrapper>
        {trends.map((trend, i) => {
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
              border={i !== relatedTrendsData.length - 1}
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
    </RelatedTrendsWrapper>
  );
};
