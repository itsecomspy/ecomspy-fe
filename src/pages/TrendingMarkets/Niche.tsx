import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Layout, Breadcrumb, Search } from "../../components/";
import {
  NicheTabs,
  AllTab,
  BrandsTab,
  KeywordsTab,
  ProductsTab,
} from "../../components/trendingMarkets/Niche";
import { Filters } from "../../components/trendingMarkets/Filters";

const NicheWrapper = styled.div`
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
    { id: 2, component: <ProductsTab key={2} /> },
    //{ id: 3, component: <KeywordsTab key={3} /> },
  ];
  const componentToDisplay = tabViews.map((tab) => {
    if (tab.id === tabItem) {
      return tab.component;
    }
  });

  return (
    <Layout header={<Breadcrumb array={headerText} />}>
      <NicheWrapper>
        <NicheTabs active={tabItem} handleTabSwtich={setTabItem} />
        <div className="w-full flex items-center justify-end">
          {/* <Search width="333px" /> */}
          <Filters />
        </div>
        <>{componentToDisplay}</>
      </NicheWrapper>
    </Layout>
  );
};
