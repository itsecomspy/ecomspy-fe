import React from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import firebaseService from "../services/firebase.service";
import { useNavigate } from "react-router-dom";

const functionsBaseUrl = (
  import.meta.env.VITE_FUNCTIONS_BASE_URL ||
  `https://us-central1-${import.meta.env.VITE_FIREBASE_PROJECT_ID}.cloudfunctions.net`
).replace(/\/$/, "");
const resolveUrl = (path: string) => `${functionsBaseUrl}/${path}`;

export default function useSearch() {
  let navigate = useNavigate();
  const { userDetails, user } = useAuthContext();
  const [loading, setLoading] = React.useState<boolean>(true);

  // Get/set search details
  const [searchDetails, setSearchDetails] = React.useState<{
    count: number;
    lastUpdated: string;
  }>({ count: 0, lastUpdated: "" });

  React.useMemo(async () => {
    return await firebaseService
      .getDocument(`users/${user?.uid}`)
      .then((res) => {
        const data = res.data();
        if (data?.search) {
          setSearchDetails(data?.search);
        }
      });
  }, [user]);

  const getSearchData = React.useCallback(
    async ({ keyword }: { keyword: string }) => {
      setLoading(true);
      let isBusinessUser = userDetails?.subscription?.planId === 3;
      if (searchDetails?.count || isBusinessUser) {
        // Return if date is not past 24 hours since last update
        if (
          searchDetails?.count === 0 &&
          searchDetails.lastUpdated !== new Date().toLocaleDateString("en-GB")
        ) {
          navigate("/settings", { state: { tab: "subscription" } });
        }
        
        let searchCountUpdate =
        isBusinessUser ||
        searchDetails.lastUpdated !== new Date().toLocaleDateString("en-GB")
        ? 10
        : searchDetails?.count - 1;
        return await axios
          .get(resolveUrl("searchKeyword"), {
            params: {
              keyword,
              userId: user?.uid,
              count: searchCountUpdate,
            },
            headers: {
              "Access-Control-Allow-Headers": "*",
              "Access-Control-Allow-Origin": "*",
              "Access-Control-Allow-Methods": "*",
            },
          })
          .then(async (response) => {
            setLoading(false);
            return response.data;
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      }
    },
    [searchDetails]
  );

  return {
    getSearchData,
    searchCount: searchDetails?.count,
    loading,
  };
}
