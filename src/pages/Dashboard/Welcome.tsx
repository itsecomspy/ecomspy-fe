import React from "react";
import styled from "styled-components";
import { Banner, Button } from "@components/index";
import { useNavigate } from "react-router-dom";
import { setWithExpiry } from "@root/src/utils/functions";
import { useAuthContext } from "@root/src/context/AuthContext";
import { useLanguageContext } from "@root/src/context/LanguageContext";
import { TrendingMarkets } from "@components/pages/Dashboard/TrendingMarkets";

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  overflow: scroll;
  column-gap: 8px;
  row-gap: 24px;
  justify-content: space-between;
  width: 100%;
  margin: 2rem auto;
`;

const ActionWrapper = styled.div`
  width: 100%;
  padding: 48px;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

export const Welcome = () => {
  const { lan } = useLanguageContext();
  const { userDetails } = useAuthContext();
  const navigate = useNavigate();

  const [banner, setBanner] = React.useState<boolean>(false);
  const isSubscribed = userDetails && userDetails?.subscription;
  
  const handleClose = () => {
    // Set expiry time at two weeks
    setWithExpiry({ key: "subscriptionBanner", val: true, ttl: 86400 * 14 });
    setBanner(false);
  };
  const navigateSettings = () => {
    handleClose();
    navigate("/settings", { state: { tab: "subscription" } });
  };
  const navigateMarkets = () => {
    handleClose();
    navigate("/trending-markets");
  };

  React.useMemo(() => {
    let checkBannerInLocalStorage = JSON.parse(
      // @ts-ignore
      localStorage.getItem("subscriptionBanner")
    );
    const currentTime = new Date().getTime();

    if (checkBannerInLocalStorage === null) {
      setTimeout(() => {
        setBanner(true);
      }, 5000);
    }
    // Check banner expiry time againt current time
    // If expired remove item from localstorage
    if (
      !isSubscribed &&
      checkBannerInLocalStorage?.expiry < currentTime
    ) {
      localStorage.removeItem("subscriptionBanner");
      setTimeout(() => {
        setBanner(true);
      }, 5000);
    }
  }, []);

  return (
    <div className="p-4 sm:p-0 h-full w-full relative overflow-scroll mb-10">
      {banner && (
        <Banner
          fixed
          handleClose={handleClose}
          subtitle={bannerSubtitle[lan]}
          title={bannerTitle[lan]}
          buttonText={subscriptionText[lan]}
          action={navigateSettings}
        />
      )}
      <Wrapper>
        <p className="px-2 text-h4 lg:text-display-2-md lg:text-h2 text-center w-full">
          {welcomeText[lan]}{" "}
          {userDetails && (
            <span className="capitalize landing-text-color">
              {userDetails?.fullName}
            </span>
          )}
        </p>
        <div className="mt-8 px-4 flex gap-y-4 flex-col">
          {bulletText[lan].map((text: string, key: React.Key) => (
            <div className="text-white flex items-baseline flex-wrap">
              <span className="min-w-6 min-h-6 w-6 h-6 flex items-center justify-center mr-4 rounded-full bg-[#2D55FB]">
                {Number(key) + 1}
              </span>
              <p className="font-medium lg:min-w-[275px] text-[15px] sm:text-[18px]">
                {text}
              </p>
              <p className="text-[14px] my-4 sm:text-left w-full font-light">
                {bulletPointsText[lan][Number(key)]}
              </p>
            </div>
          ))}
        </div>
      </Wrapper>
      {userDetails && !isSubscribed && (
        <div className="p-4 px-0 w-full min-h-[200px] relative border-0 border-t-[1px] border-t-[#ffffff21] pt-[48px] mt-[64px]">
          <TrendingMarkets limit={6} />
        </div>
      )}
      <ActionWrapper>
        {userDetails &&
          (!isSubscribed ? (
            <>
              <p className="text-[18px] text-center text-[#FFFFFFB8] font-light">
                {moreText[lan]}
              </p>
              <div className="w-max mx-auto">
                <Button
                  size="large"
                  text={subscriptionText[lan]}
                  action={navigateSettings}
                />
              </div>
            </>
          ) : (
            <>
              <div className="w-max mx-auto">
                <Button
                  size="large"
                  text={startedText[lan]}
                  action={navigateMarkets}
                />
              </div>
            </>
          ))}
      </ActionWrapper>
    </div>
  );
};

const welcomeText: any = {
  en: "Welcome",
  fr: "Bienvenue",
};
const bulletText: any = {
  en: [
    "Discover Trending Markets",
    "Analyze search trends",
    "Weekly top 10 markets",
  ],
  fr: [
    "Découvrez les marchés tendance",
    "Analyser les tendances de recherche",
    "Top 10 des marchés hebdomadaires",
  ],
};
const bulletPointsText: any = {
  en: [
    "Explore the hottest ecommerce brands and keyword to uncover winning products. Forecast product trends for the next year and delve into related trends. Understand the advertising landscape with channel breakdowns across Instagram, Facebook, and TikTok",
    "Access comprehensive data on keyword volume and anticipate trends over the next year. Gain valuable insights to optimize your marketing strategies and stay ahead of the curve in your niche.",
    "Stay informed with our curated list of the top 10 markets every week. Identify emerging opportunities and capitalize on trends to drive your business forward.",
  ],
  fr: [
    "Explorez les marques de commerce électronique et les mots-clés les plus populaires pour découvrir les produits gagnants. Prévoyez les tendances des produits pour l'année prochaine et explorez les tendances associées. Comprendre le paysage publicitaire avec la répartition des canaux sur Instagram, Facebook et TikTok",
    "Accédez à des données complètes sur le volume de mots clés et anticipez les tendances au cours de l'année prochaine. Obtenez des informations précieuses pour optimiser vos stratégies marketing et garder une longueur d'avance dans votre niche.",
    "Restez informé grâce à notre liste organisée des 10 meilleurs marchés chaque semaine. Identifiez les opportunités émergentes et capitalisez sur les tendances pour faire progresser votre entreprise.",
  ],
};

const moreText: any = {
  en: "Need access to more charts?",
  fr: "Besoin d'accéder à plus de graphiques?",
};

const bannerSubtitle: any = {
  en: "Subscribed yet?",
  fr: "Déjà abonné?",
};
const bannerTitle: any = {
  en: "Explore our plans to get started",
  fr: "Découvrez nos plans pour commencer",
};
const subscriptionText: any = {
  en: "Subscribe Now",
  fr: "Abonnez-vous maintenant",
};
const startedText: any = {
  en: "Get Started",
  fr: "Commencer",
};
