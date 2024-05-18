import styled from "styled-components";
import { useLocation, useNavigate } from "react-router-dom";
import { Layout, Breadcrumb, Loader } from "../../components";
import { Chart } from "../../components/pages/TrendingMarket/Chart";
import { ForecastInfo } from "../../components/pages/TrendingMarket/Explore/ForecastInfo";
import { RelatedTrends } from "@components/pages/TrendingMarket/Explore/RelatedTrends";
import React from "react";
import useSearch from "../../hooks/useSearch";
import { useClientRect } from "@root/src/utils/functions";
import { useWindowSize } from "usehooks-ts";
import { useNicheContext } from "@components/pages/TrendingMarket/Niche/NicheContext";
import { useAuthContext } from "@root/src/context/AuthContext";

const SearchWrapper = styled.div`
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

export const Search = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const locationText = location?.pathname?.substring(1);
  const headerText = locationText?.split("/").map((h) => {
    const string = h.replaceAll("-", " ");
    return string;
  });
  const title = headerText[headerText.length - 1];

  // Get user credentials
  const { userDetails, subscriptionData } = useAuthContext();

  // Fetch search keyword data
  const [keywordData, setData] = React.useState<any>();
  const { getSearchData, searchCount, loading } = useSearch();
  const { setTimeline } = useNicheContext();

  React.useMemo(() => {
    if (userDetails) {
      const isUserSearchEnabled =
        userDetails?.subscription?.planId === 3 ||
        searchCount > 0 ||
        Date.now() > subscriptionData.endDate * 1000;

      if (isUserSearchEnabled) {
        getSearchData({
          keyword: title,
        }).then((res: any) => {
          setData(res);
          setTimeline("2year");
        });
      } else {
        navigate("/settings", { state: { tab: "subscription" } });
      }
    }
  }, [userDetails, searchCount]);

  // Use ref for wrapper width. Use to control chart height and width
  const {
    rect: { width },
    ref,
  } = useClientRect();
  const chartWidth =
    width > 694
      ? (width * 95) / 100
      : width > 493
      ? (width * 92.5) / 100
      : width > 344
      ? (width * 90) / 100
      : (width * 90) / 100;
  const chartHeight = width > 694 ? 450 : width > 344 ? 350 : 250;
  const { width: windowWidth } = useWindowSize();

  return (
    <Layout header={<Breadcrumb url="/search" array={headerText} />}>
      <SearchWrapper>
        {loading ? (
          <Loader />
        ) : (
          <>
            {/* <Filters hideCategories hideStatus justify="flex-end" /> */}
            <p className="text-[24px] text-white font-medium capitalize">
              {title}
            </p>
            <p className="text-[14px] text-white/30">
              {keywordData?.description}
            </p>
            <div className="flex flex-col sm:flex-row w-full gap-[24px] items-center justify-between">
              <div ref={ref} className="w-full">
                <Chart
                  size={windowWidth > 1024 ? "large" : "small"}
                  chartData={keywordData?.chartData?.trend.map(
                    (m: { month: any; value: any }) => {
                      const formatedData = {
                        formattedTime: m.month,
                        volume: m.value,
                      };
                      return formatedData;
                    }
                  )}
                  name={title}
                  margin={{ t: 64, l: 16, r: 0, b: 0 }}
                  width={chartWidth}
                  height={chartHeight}
                  volume={keywordData?.volume}
                  button={true}
                  hiddenText
                />
              </div>
              <ForecastInfo />
            </div>
            {keywordData && (
              <RelatedTrends width="100%" search keyword={title} />
            )}
          </>
        )}
      </SearchWrapper>
    </Layout>
  );
};
