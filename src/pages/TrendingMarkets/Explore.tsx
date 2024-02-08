import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Layout, Breadcrumb } from "../../components/";
import { Filters } from "../../components/trendingMarkets/Filters";
import { Chart } from "../../components/trendingMarkets/Chart";
import { ForecastInfo } from "../../components/trendingMarkets/Explore/ForecastInfo";

const ExploreWrapper = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.02);
  width: 100%;
  max-height: 778px;
  height: 100%;
`;
export const Explore = () => {
  let location = useLocation();
  let locationText = location.pathname.substring(1);
  let headerText = locationText.split("/").map((h) => {
    let string = h.replace("-", " ");
    return string;
  });
  let title = headerText[headerText.length - 1];
  return (
    <Layout header={<Breadcrumb array={headerText} />}>
      <ExploreWrapper>
        <Filters justify="space-between" />
        <p className="text-[24px] text-white font-medium capitalize">{title}</p>
        <div className="flex gap-[24px] justify-between">
          <Chart
            margin={{ t: 0, l: 0, r: 0, b: 0 }}
            button={<></>}
            height={350}
            width={600}
          />
          <ForecastInfo />
        </div>
      </ExploreWrapper>
    </Layout>
  );
};
