import React from "react";
import styled from "styled-components";
import { NoData } from ".";
import { Chart } from "../Chart";
import { Loader, Pagination } from "../../..";
import useTrends from "@root/src/hooks/useTrends";
import { getChartWidth, useClientRect } from "@root/src/utils/functions";
import { useNicheContext } from "./NicheContext";
import { useLocation } from "react-router-dom";

const Wrapper = styled.div<{
  $lastItem?: boolean;
}>`
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  column-gap: 8px;
  row-gap: 24px;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  ${(props) =>
    props.$lastItem
      ? `
  & > div:last-child {
    margin-right: auto;
    margin-left: 20px;
    @media screen and (max-width: 1800px) {
      margin-left: 15px;
    };
    @media screen and (max-width: 1700px) {
      margin-left: 10px;
    };
    @media screen and (max-width: 1650px) {
      margin-left: 5px;
    };
    @media screen and (max-width: 1550px) {
      margin-left: 0;
    };
  };
    `
      : ``}
`;

export const NonBrandsTab = () => {
  // Currently displayed items in pagination
  const [items, setItems] = React.useState<any[]>([]);
  const [currentItems, setCurrentItems] = React.useState<number | undefined>();
  const [page, setPage] = React.useState<number>(1);

  const { timeline, status, sort } = useNicheContext();

  const { getTrendData, trendLoading } = useTrends();
  const location = useLocation();
  let splitLocation = location?.pathname?.split("/");
  let collection = splitLocation[splitLocation.length - 1];

  // Reset page if timeline, status, sort is changed
  React.useMemo(() => {
    getTrendData({
      page: 1,
      sort: sort,
      status: status,
      brand: "No",
      duration: timeline,
      collection,
    }).then((res) => {
      setItems(res.paginatedOutput);
      setCurrentItems(res.totalItems);
      setPage(1);
    });
  }, [timeline, sort, status]);
  // Trigger if page is changed
  React.useMemo(() => {
    getTrendData({
      page: page,
      sort: sort,
      status: status,
      brand: "No",
      duration: timeline,
      collection,
    }).then((res) => {
      setItems(res.paginatedOutput);
      setCurrentItems(res.totalItems);
    });
  }, [page]);

  // Use ref for wrapper width. Use to control chart height and width
  const {
    rect: { width },
    ref,
  } = useClientRect();
  let chartWidth = getChartWidth(width);
  let chartHeight = width < 1300 ? 250 : 300;

  return (
    <>
      {trendLoading ? (
        <Loader />
      ) : (
        <>
          <Wrapper
            $lastItem={
              (Number(currentItems) / 18).toFixed(0) === page.toString()
            }
            ref={ref}
          >
            {items?.length === 0 ? (
              <NoData />
            ) : (
              items.map((trend: any, index: number) => {
                return (
                  <Chart
                    key={index}
                    height={chartHeight}
                    width={chartWidth}
                    margin={{ t: 64, l: 16, r: 0, b: 0 }}
                    chartData={trend.chartData}
                    volume={trend.volume || trend.volumne}
                    name={trend.keyword}
                    description={trend.description}
                    growth={trend.growth}
                  />
                );
              })
            )}
          </Wrapper>
          <Pagination
            currentItems={currentItems}
            itemsToDisplay={18}
            page={page}
            setPage={setPage}
          />
        </>
      )}
    </>
  );
};
