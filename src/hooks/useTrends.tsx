import React from "react";
import axios from "axios";

const functionsBaseUrl = (
  import.meta.env.VITE_FUNCTIONS_BASE_URL ||
  `https://us-central1-${import.meta.env.VITE_FIREBASE_PROJECT_ID}.cloudfunctions.net`
).replace(/\/$/, "");
const resolveUrl = (path: string) => `${functionsBaseUrl}/${path}`;

const headers = {
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
};

export default function useTrends() {
  const [trendLoading, setTrendLoading] = React.useState<boolean>(true);
  const [keywordLoading, setKeywordLoading] = React.useState<boolean>(true);
  const [relatedTrendsLoading, setRelatedTrendsLoading] =
    React.useState<boolean>(true);

  const getTrendData = React.useCallback(
    async ({
      page,
      sort,
      status,
      brand,
      duration,
      collection,
    }: {
      page: Number;
      status: 0 | 1 | 2 | 3;
      sort: "popularity" | "growth" | "trendLine" | "volume";
      brand: "all" | "Yes" | "No";
      duration:
        | "forecast"
        | "3mon"
        | "6mon"
        | "1year"
        | "2year"
        | "5year"
        | "10year";
      collection: string;
    }) => {
      setTrendLoading(true);
      const setDuration = duration === "forecast" ? "1year" : duration;
      return await axios
        .get(resolveUrl("getTrendData"), {
          params: {
            page,
            sort,
            status,
            brand,
            duration: setDuration,
            collection,
          },
          headers: headers,
        })
        .then((response) => {
          setTrendLoading(false);
          return response.data;
        })
        .catch((error) => {
          setTrendLoading(false);
          console.log(error);
        });
    },
    []
  );

  const getKeywordData = React.useCallback(
    async ({
      keyword,
      collection,
    }: {
      keyword: string;
      collection: string;
    }) => {
      setKeywordLoading(true);
      return await axios
        .get(resolveUrl("getKeywordData"), {
          params: {
            keyword,
            collection,
          },
          headers: headers,
        })
        .then((response) => {
          setKeywordLoading(false);
          return response.data;
        })
        .catch((error) => {
          setKeywordLoading(false);
          console.log(error);
        });
    },
    []
  );

  const getRelatedTrendsData = React.useCallback(
    async ({
      keyword,
      collection,
      search,
    }: {
      keyword: string;
      collection?: string;
      search?: boolean;
    }) => {
      setRelatedTrendsLoading(true);
      return await axios
        .get(resolveUrl("getRelatedTrends"), {
          params: {
            keyword,
            collection,
            search,
          },
          headers: headers,
        })
        .then((response) => {
          setRelatedTrendsLoading(false);
          return response.data;
        })
        .catch((error) => {
          setRelatedTrendsLoading(false);
          console.log(error);
        });
    },
    []
  );

  return {
    trendLoading,
    getTrendData,
    keywordLoading,
    getKeywordData,
    relatedTrendsLoading,
    getRelatedTrendsData,
  };
}
