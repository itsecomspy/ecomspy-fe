import styled from "styled-components";
import { Trend } from ".";
import { Loader, Pagination } from "../../..";
import React from "react";
import useTrends from "@root/src/hooks/useTrends";

const RelatedTrendsWrapper = styled.div<{
  $width?: string;
}>`
  width: ${props => props.$width ? props.$width : "50%"};
  padding: 24px;
  gap: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.02);
  position: relative;
  margin-bottom: 24px;
  @media screen and (max-width: 1024px) {
    width: 100%;
  }
  @media screen and (max-width: 479px) {
    padding: 16px;
    background: transparent;
  }
`;

const TrendsWrapper = styled.div`
  display: flex;
  padding: 0px 16px;
  align-items: center;
  flex-direction: column;
  border-radius: 4px;
  background: rgba(255, 255, 255, 0.02);
  @media screen and (max-width: 479px) {
    background: transparent;
    padding: 0;
  }
`;

export const RelatedTrends = ({
  collection,
  keyword,
  width,
  data,
  search,
}: {
  collection?: string;
  keyword: string;
  width?: string;
  data?: any;
  search?: boolean;
}) => {
  // Currently displayed items in pagination
  const [page, setPage] = React.useState<number>(1);
  const [trends, setTrends] = React.useState<any[]>([]);
  let itemsToDisplay = 4;

  const { relatedTrendsLoading, getRelatedTrendsData } = useTrends();
  React.useEffect(() => {
    if (data) {
      setTrends(
        data?.filter((fil: { trend: string | any[] }) => fil.trend.length !== 0)
      );
    } else {
      getRelatedTrendsData({
        keyword: keyword,
        collection: collection,
        search
      }).then((res: any) => {
        setTrends(
          res.relatedTrends?.filter(
            (fil: { trend: string | any[] }) => fil.trend.length !== 0
          )
        );
      });
    }
  }, [data]);

  if (relatedTrendsLoading && trends?.length === 0) {
    return (
      <div className="w-full py-16 flex items-center justify-center">
        <Loader compact height={40} width={40} />
      </div>
    );
  }

  return (
    <RelatedTrendsWrapper $width={width}>
      <p>Related Trends</p>
      <TrendsWrapper>
        {trends
          ?.map((t, i) => {
            return (
              <Trend
                key={i}
                text={t.keyword}
                border
                data={t.trend.map((t: any) => {
                  return {
                    name: t.month,
                    amt: t.month,
                    pv: t.value,
                    uv: t.year,
                  };
                })}
              />
            );
          })
          .slice(itemsToDisplay * (page - 1), itemsToDisplay * page)}
      </TrendsWrapper>
      <Pagination
        currentItems={trends?.length}
        itemsToDisplay={itemsToDisplay}
        page={page}
        setPage={setPage}
      />
    </RelatedTrendsWrapper>
  );
};
