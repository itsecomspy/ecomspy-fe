import React from "react";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";
import firebaseService from "../services/firebase.service";
import { useNavigate } from "react-router-dom";

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
        setSearchDetails(data?.search);
      });
  }, [user]);


  const getSearchData = React.useCallback(
    async ({ keyword }: { keyword: string }) => {
      setLoading(true);

      let isBusinessUser = userDetails?.subscription?.planId === 3;
      if (searchDetails.count || isBusinessUser) {
        // Return if date is not past 24 hours since last update
        if (
          searchDetails.count === 0 &&
          searchDetails.lastUpdated !== new Date().toLocaleDateString()
        ) {
          navigate("/settings", { state: { tab: "subscription" } });
        }

        let searchCountUpdate =
          (isBusinessUser ||
          searchDetails.lastUpdated !== new Date().toLocaleDateString())
            ? 10
            : searchDetails.count - 1;
        return await axios
          .get(
            "https://searchkeyword-ykxdfh7koq-uc.a.run.app",
            {
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
            }
          )
          .then(async (response) => {
            setLoading(false);

            if (
              userDetails?.subscription?.planId === 1 ||
              userDetails?.subscription?.planId === 2
            ) {
              // await firebaseService.
            }
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
    searchCount: searchDetails.count,
    loading,
  };
}
