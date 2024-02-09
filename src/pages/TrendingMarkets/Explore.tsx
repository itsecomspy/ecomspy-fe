import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Layout, Breadcrumb, Button } from "../../components/";
import { Filters } from "../../components/trendingMarkets/Filters";
import { Chart } from "../../components/trendingMarkets/Chart";
import { ForecastInfo, RelatedTrends } from "../../components/trendingMarkets/Explore/";
import { PiArrowRight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

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
  overflow: scroll;
`;
export const Explore = () => {
  let location = useLocation();
  let locationText = location.pathname.substring(1);
  let headerText = locationText.split("/").map((h) => {
    let string = h.replace("-", " ");
    return string;
  });
  let title = headerText[headerText.length - 1];

  const navigate = useNavigate();
  const chartButton = (
    <Button
      // Navigate to product details
      // action={() => navigate("/product-details")}
      text="Product Details"
      height={24}
      icon={<PiArrowRight />}
      backgroundColor="linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.00) 100%);"
    />
  );

  return (
    <Layout header={<Breadcrumb array={headerText} />}>
      <ExploreWrapper>
        <Filters hideCategories justify="flex-end" />
        <p className="text-[24px] text-white font-medium capitalize">{title}</p>
        <div className="flex gap-[24px] justify-between">
          <Chart
            size="large"
            margin={{ t: 64, l: 16, r: 0, b: 0 }}
            button={chartButton}
            height={350}
            width={600}
          />
          <ForecastInfo />
        </div>
        <RelatedTrends />
      </ExploreWrapper>
    </Layout>
  );
};
