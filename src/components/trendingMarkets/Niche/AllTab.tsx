import React from "react";
import styled from "styled-components";
import { NoData } from "./";
import { Chart } from "../Chart";
import { Loader, Pagination } from "../..";
import { useAtomValue } from "jotai";
import { nicheAtom } from "@root/src/main.atom";
import { useLocation } from "react-router-dom";
import useAllTrends from "@root/src/hooks/use-all-trends";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  gap: 12px;
  row-gap: 12px;
  height: 100%;
  width: 100%;
`;

export const AllTab = () => {
  const location = useLocation();
  const [, parent, child] = location.pathname.substring(1).split("/");

  const nicheAtomData = useAtomValue(nicheAtom);

  // Currently displayed items in pagination
  const [currentItems, setItems] = React.useState<any>([]);
  const [page, setPage] = React.useState<number>(1);
  let itemsToDisplay = 9;

  const { trends, isLoading } = useAllTrends({
    categoryId: nicheAtomData?.id || 0,
    values: {
      parent,
      child,
    },
  });

  React.useEffect(() => {
    if (trends) {
      setItems(trends);
    }
  }, [trends]);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Wrapper>
            {currentItems?.length === 0 ? (
              <NoData />
            ) : (
              currentItems
                ?.slice(itemsToDisplay * (page - 1), itemsToDisplay * page)
                .map((product: any, index: number) => {
                  const trendLine = JSON.parse(product.trendData || "{}") as {
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
                  const chartData: {
                    name: string;
                    amt: string;
                    pv: number;
                    uv: string;
                  }[] = trendLine.default.timelineData.map((t) => {
                    let label = `${t.formattedAxisTime.split(" ")[0]} ${
                      t.formattedAxisTime.split(" ")[2]
                    }`;
                    return {
                      label: label,
                      name: t.formattedTime,
                      amt: t.formattedTime.split(",")[1],
                      pv: t.value[0],
                      uv: t.formattedTime.split(",")[0],
                    };
                  });

                  return (
                    <Chart
                      key={index}
                      height={225}
                      width={275}
                      margin={{ t: 64, l: 16, r: 0, b: 0 }}
                      chartData={chartData}
                      volume={product.volume}
                      name={product.query}
                    />
                  );
                })
            )}
          </Wrapper>
          <Pagination
            currentItems={currentItems}
            itemsToDisplay={itemsToDisplay}
            page={page}
            setPage={setPage}
          />
        </>
      )}
    </>
  );
};
