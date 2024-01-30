import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Layout, Breadcrumb, Search } from "../../components/";
import { NicheTabs } from "../../components/trendingMarkets/NicheHeader";

const NicheWrapper = styled.div`
  display: flex;
  padding: 24px;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.02);
  width: 100%;
  max-height: 614px;
  height: 100%;
`;

export const Niche = () => {
  let location = useLocation();
  let locationText = location.pathname.substring(1);
  let headerText = locationText.split("/").map((h) => {
    let string = h.replace("-", " ");
    return string;
  });

  return (
    <Layout header={<Breadcrumb array={headerText} />}>
      <NicheWrapper>
        <NicheTabs />
        <div className="w-[333px]">
          <Search />
        </div>
      </NicheWrapper>
    </Layout>
  );
};
