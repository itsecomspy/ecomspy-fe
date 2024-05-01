import { useAuthContext } from "@root/src/context/AuthContext";
import { Layout } from "../../components/layout/Layout";
import { Content } from "../../components/pages/TrendingMarket";
import { useNavigate } from "react-router-dom";
import React from "react";

export const TrendingMarkets = () => {
  const { userDetails } = useAuthContext();

  // Reroute to subscription if user in no subscribed
  const navigate = useNavigate();
  React.useEffect(() => {
    if (userDetails && !userDetails?.subscription) {
      navigate("/settings", { state: { tab: "subscription" } });
    }
  }, [userDetails]);

  return <Layout children={<Content />} />;
};
