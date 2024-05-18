import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Layout, Breadcrumb } from "../../components/";
import {
  NicheTabs,
  AllTab,
  BrandsTab,
  NonBrandsTab,
} from "../../components/pages/TrendingMarket/Niche";
// import { Filters } from "../../components/TrendingMarkets/Filters";
import { NicheProvider } from "../../components/pages/TrendingMarket/Niche/NicheContext";

const NicheWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 24px;
  padding-bottom: 24px;
  border-radius: 4px;
  width: 100%;
  max-height: 778px;
  height: 100%;
  @media screen and (max-width: 479px) {
    max-height: calc(100% - 53px);
    padding: 16px;
    gap: 0px;
    overflow: clip;
  }
`;

export const Niche = () => {
  let location = useLocation();
  let locationText = location.pathname.substring(1);
  let headerText = locationText.split("/").map((h) => {
    let string = h.replaceAll("-", " ");
    return string;
  });

  // Component tab items and filter to display component
  const [tabItem, setTabItem] = React.useState<number>(0);
  const tabViews = [
    { id: 0, component: <AllTab key={0} /> },
    { id: 1, component: <BrandsTab key={1} /> },
    { id: 2, component: <NonBrandsTab key={2} /> },
  ];
  const componentToDisplay = tabViews.map((tab) => {
    if (tab.id === tabItem) {
      return tab.component;
    }
  });

  return (
    <Layout header={<Breadcrumb array={headerText} />}>
      <NicheProvider>
        <NicheWrapper>
          <NicheTabs active={tabItem} handleTabSwtich={setTabItem} />
          <>{componentToDisplay}</>
        </NicheWrapper>
      </NicheProvider>
    </Layout>
  );
};
