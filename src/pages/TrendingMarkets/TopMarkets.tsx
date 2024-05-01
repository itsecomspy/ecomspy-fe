import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@root/src/context/AuthContext";
import { Layout } from "@components/index";
import { TrendingMarkets } from "@components/pages/Dashboard/TrendingMarkets";

export const TopMarkets = () => {
  const { userDetails } = useAuthContext();

  // Reroute to subscription if user in no subscribed
  const navigate = useNavigate();
  React.useEffect(() => {
    if (userDetails && !userDetails?.subscription) {
      navigate("/settings", { state: { tab: "subscription" } });
    }
  }, [userDetails]);

  return (
    <Layout
      children={
        <div className="p-4 sm:p-0 h-full w-full relative overflow-scroll mb-10">
          <div>
            <TrendingMarkets />
          </div>
        </div>
      }
    />
  );
};

// const bannerSubtitle: any = {
//   en: "Subscribed yet?",
//   fr: "Déjà abonné?",
// };
// const bannerTitle: any = {
//   en: "Explore our plans to get started",
//   fr: "Découvrez nos plans pour commencer",
// };
// const subscriptionText: any = {
//   en: "Subscribe Now",
//   fr: "Abonnez-vous maintenant",
// };
