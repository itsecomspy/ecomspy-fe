import React from "react";
import styled from "styled-components";
import { Button, Loader } from "../..";
import useTrends from "@root/src/hooks/useDemoTrends";
import { Chart } from "@components/pages/TrendingMarket/Chart";
import { useLanguageContext } from "@root/src/context/LanguageContext";
import { useNavigate } from "react-router-dom";
import { PiArrowRight } from "react-icons/pi";
import { useClientRect, getChartWidth } from "@root/src/utils/functions";
import { useAuthContext } from "@root/src/context/AuthContext";
import { useNicheContext } from "../TrendingMarket/Niche/NicheContext";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  column-gap: 8px;
  row-gap: 24px;
  justify-content: space-between;
  height: 100%;
  width: 100%;
`;

export const TrendingMarkets = ({ limit = 10 }: { limit?: number }) => {
  const { loading, demoTrends } = useTrends();
  const { lan } = useLanguageContext();
  const navigate = useNavigate();
  const { userDetails } = useAuthContext();

  // Set timeline to one year
  const { setTimeline } = useNicheContext();
  React.useMemo(() => {
    setTimeline("5year");
  }, []);

  // Use ref for wrapper width. Use to control chart height and width
  const {
    rect: { width },
    ref,
  } = useClientRect();
  let chartWidth = getChartWidth(width);
  let chartHeight = width < 1300 ? 250 : 300;

  const chartButton = (
    <Button
      action={() =>
        navigate(
          !!userDetails.subscription ? "/trending-markets" : "/settings",
          { state: { tab: "subscription" } }
        )
      }
      text={buttonText[lan]}
      height={24}
      icon={<PiArrowRight />}
      backgroundColor="linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.00) 100%);"
    />
  );

  return (
    <>
      {loading ? (
        <div className="absolute top-0 h-full w-full">
          <Loader compact />
        </div>
      ) : (
        <>
          <div className="w-full flex justify-end mb-4">
            <Button
              height={28}
              text="View More"
              action={() => navigate("/trending-markets")}
              icon={<PiArrowRight />}
              backgroundColor="linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.00) 100%);"
            />
          </div>
          <Wrapper ref={ref}>
            {demoTrends.slice(0, limit).map((item: any, index: number) => {
              return (
                <Chart
                  key={index}
                  height={chartHeight}
                  width={chartWidth}
                  margin={{ t: 64, l: 16, r: 0, b: 0 }}
                  chartData={item.chartData}
                  volume={item.volume * 100 || item.volumne * 100}
                  name={item.title}
                  description={item.description[lan]}
                  button={chartButton}
                />
              );
            })}
          </Wrapper>
        </>
      )}
    </>
  );
};

const buttonText: any = {
  en: "Explore",
  fr: "Explorer",
};
