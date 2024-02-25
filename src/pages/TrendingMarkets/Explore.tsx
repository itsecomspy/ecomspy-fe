import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { Layout, Breadcrumb, Button, Loader } from "../../components/";
import { Filters } from "../../components/trendingMarkets/Filters";
import { Chart } from "../../components/trendingMarkets/Chart";
import { ForecastInfo } from "../../components/trendingMarkets/Explore/ForecastInfo";
import { PiArrowRight } from "react-icons/pi";
import { RelatedTrends } from "@root/src/components/trendingMarkets/Explore/RelatedTrends";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import firebaseService from "@root/src/services/firebase.service";
import { useAtomValue } from "jotai";
import { filterAtom } from "@root/src/main.atom";
import { useEffect } from "react";

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

type ProductDetalResponse = {
  query: string;
  description: string;
  volume: number;
  productTrend: {
    default: {
      averages: number[];
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
  relatedQueries: {
    query: string;
    value: number;
    formattedValue: string;
    hasData: boolean;
    link: string;
    trendData: string;
  }[];
  relatedTopics: {
    query: string;
    value: number;
    formattedValue: string;
    hasData: boolean;
    link: string;
    trendData: string;
  }[];
};
type RelatedTopics = {
  query: string;
  value: number;
  formattedValue: string;
  hasData: boolean;
  link: string;
  trendData: string;
}[];

function useController() {
  const queryClient = useQueryClient();
  let location = useLocation();
  const [, parent, child, p] = location.pathname.substring(1).split("/");
  let title = p.replaceAll("-", " ");
  const filterAtomData = useAtomValue(filterAtom);

  const getProductDetailMutation = useMutation<ProductDetalResponse | null>({
    mutationKey: ["product", title],
    mutationFn: async () => {
      const res = await firebaseService.callFunction("getProductDetails", {
        keyword: title,
        //category: id,
        startTime: filterAtomData.timeline?.date,
      });
      return res.data as ProductDetalResponse;
    },
  });

  const { data: productDetail, isLoading: loadingProductDetail } = useQuery({
    queryKey: ["product", title],
    queryFn: async () => {
      return getProductDetailMutation.mutateAsync();
    },
  });

  const { data: relatedTopics = [], isLoading: loadingRelatedTopics } =
    useQuery({
      queryKey: ["related-topics", title],
      queryFn: async () => {
        return (
          await firebaseService.callFunction("getCategoryKeywords", {
            keyword: title,
            startTime: filterAtomData?.timeline?.date,
            minInterest: filterAtomData.status?.value.min || 0,
            maxInterest: filterAtomData.status?.value.max || 100,
          })
        ).data as RelatedTopics;
      },
    });

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["product", title],
    });
  }, [filterAtomData.timeline]);

  useEffect(() => {
    queryClient.invalidateQueries({
      queryKey: ["related-topics", title],
    });
  }, [filterAtomData]);

  const chartData: {
    name: string;
    amt: string;
    pv: number;
    uv: string;
  }[] = (productDetail?.productTrend?.default?.timelineData || []).map((t) => {
    return {
      name: t.formattedTime,
      amt: t.formattedTime.split(",")[1],
      pv: t.value[0],
      uv: t.formattedTime.split(",")[0],
    };
  });

  return {
    productDetail,
    chartData,
    loadingProductDetail,
    relatedTopics,
    loadingRelatedTopics,
    parent,
    child,
    title,
  };
}

export const Explore = () => {
  let location = useLocation();
  let locationText = location.pathname.substring(1);
  let headerText = locationText.split("/").map((h) => {
    let string = h.replaceAll("-", " ").replaceAll("%20", " ");
    return string;
  });
  let title = headerText[headerText.length - 1];

  const {
    productDetail,
    chartData,
    loadingProductDetail,
    relatedTopics,
    loadingRelatedTopics,
  } = useController();

  const chartButton = (
    <Button
      // Navigate to product details
      // action={() => navigate("#")}
      text="More Details"
      height={24}
      icon={<PiArrowRight />}
      backgroundColor="linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.00) 100%);"
    />
  );

  return (
    <Layout header={<Breadcrumb array={headerText} />}>
      <ExploreWrapper>
        {loadingProductDetail ? (
          <Loader />
        ) : (
          <>
            <Filters hideStatus hideCategories justify="flex-end" />
            <p className="text-[24px] text-white font-medium capitalize">
              {title.replaceAll("%20", " ")}
            </p>
            <p className="text-[14px] text-white/30">
              {productDetail?.description}
            </p>
            <div className="flex gap-[24px] justify-between">
              <Chart
                size="large"
                chartData={chartData}
                name={title}
                margin={{ t: 64, l: 16, r: 0, b: 0 }}
                button={chartButton}
                height={350}
                width={600}
                volume={productDetail?.volume}
              />
              <ForecastInfo />
            </div>
            {loadingRelatedTopics ? (
              <div className="w-full py-16 flex items-center justify-center">
                <Loader compact height={40} width={40} />
              </div>
            ) : (
              <RelatedTrends trends={relatedTopics || []} />
            )}
          </>
        )}
      </ExploreWrapper>
    </Layout>
  );
};
