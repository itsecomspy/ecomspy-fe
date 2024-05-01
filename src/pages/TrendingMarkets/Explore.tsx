import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Breadcrumb, Button, Loader } from "../../components/";
import { PiArrowRight } from "react-icons/pi";
import { useNicheContext } from "@components/pages/TrendingMarket/Niche/NicheContext";
import useTrends from "@root/src/hooks/useTrends";
import React from "react";
import { Filters } from "@components/pages/TrendingMarket/Filters";
import {
  ForecastInfo,
  RelatedTrends,
  ChannelBreakdown,
} from "@components/pages/TrendingMarket/Explore";
import { Chart } from "@components/pages/TrendingMarket/Chart";
import frownFace from "@assets/images/frown-face.png";
import { useClientRect } from "@root/src/utils/functions";
import { useWindowSize } from "usehooks-ts";

const ExploreWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 4px;
  width: 100%;
  max-height: 778px;
  height: 100%;
  overflow: scroll;
  @media screen and (max-width: 479px) {
    padding: 16px;
    max-height: 100%;
    margin-bottom: 48px;
  }
`;

export const Explore = () => {
  let location = useLocation();
  let locationText = location.pathname.substring(1);
  let headerText = locationText.split("/").map((h) => {
    let string = h.replaceAll("-", " ").replaceAll("%20", " ");
    return string;
  });
  let title = headerText[headerText.length - 1];

  const { keywordLoading, getKeywordData } = useTrends();
  const { timeline } = useNicheContext();
  const [data, setData] = React.useState<any>();
  const navigate = useNavigate();

  // Get keyword data
  let keyword = location?.state?.props?.keyword;
  let splitLocation = location.pathname.split("/");
  let collection = splitLocation[splitLocation.length - 2];
  React.useEffect(() => {
    if (location.state === null) {
      navigate("/trending-markets");
    }
    getKeywordData({
      keyword: keyword,
      collection: collection,
    }).then((res: any) => {
      setData(res);
    });
  }, []);

  const chartButton = (
    <Button
      // Navigate to product details
      // action={() => navigate("#")}
      disable
      text="More Details"
      height={24}
      icon={<PiArrowRight />}
      backgroundColor="linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.00) 100%);"
    />
  );

  const formatTimeline = timeline === "forecast" ? "1year" : timeline;
  let keywordData = data?.[formatTimeline];
  const c = keywordData?.chartData.map((k: any) => Number(k.volume));
  const highestAmount = c && Math.max(...c);

  // Use ref for wrapper width. Use to control chart height and width
  const {
    rect: { width },
    ref,
  } = useClientRect();
  let chartWidth =
    width > 694
      ? (width * 95) / 100
      : width > 493
      ? (width * 92.5) / 100
      : width > 344
      ? (width * 90) / 100
      : (width * 90) / 100;
  let chartHeight = width > 694 ? 450 : width > 344 ? 350 : 250;
  const { width: windowWidth } = useWindowSize();

  return (
    <Layout header={<Breadcrumb array={headerText} />}>
      <ExploreWrapper>
        {keywordLoading ? (
          <Loader />
        ) : (
          <>
            <div className="w-full sm:w-auto sm:flex ml-auto">
              <Filters hideStatus hideCategories justify="flex-end" />
            </div>
            <p className="text-[24px] text-white font-medium capitalize">
              {title.replaceAll("%20", " ")}
            </p>
            <p className="text-[14px] text-white/30">
              {keywordData?.description}
            </p>
            <div className="flex flex-col sm:flex-row w-full gap-[24px] items-center justify-between">
              <div ref={ref} className="w-full">
                {!keywordData ? (
                  <p className="w-full h-full flex items-center justify-center text-[15px] gap-4 flex-col">
                    <img src={frownFace} className="w-16 h-16" />
                    Sorry, no data is available for this timeperiod
                  </p>
                ) : (
                  <Chart
                    size={windowWidth > 1024 ? "large" : "small"}
                    chartData={keywordData?.chartData}
                    name={title}
                    margin={{ t: 64, l: 16, r: 0, b: 0 }}
                    button={chartButton}
                    width={chartWidth}
                    height={chartHeight}
                    volume={keywordData?.volume}
                    datamax={highestAmount}
                    hiddenText
                  />
                )}
              </div>
              <ForecastInfo />
            </div>
            {data && (
              <div className="w-full gap-6 flex flex-col md:flex-row">
                <RelatedTrends
                  data={data.relatedTrends}
                  collection={collection}
                  keyword={keyword}
                />
                <ChannelBreakdown chartData={data[formatTimeline]} />
              </div>
            )}
          </>
        )}
      </ExploreWrapper>
    </Layout>
  );
};
