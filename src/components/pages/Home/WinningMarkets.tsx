import { useLanguageContext } from "@root/src/context/LanguageContext";
import graphicsImg1 from "@assets/images/landing/markets/graphics.png";
import graphicsImg2 from "@assets/images/landing/markets/graphics-1.png";
import graphicsImg3 from "@assets/images/landing/markets/graphics-2.png";
import winningMImg from "@assets/images/landing/markets/winningMImg.png";
import winningPImg from "@assets/images/landing/markets/winningPImg.png";
import { Key } from "react";

export const WinningMarkets = () => {
  const { lan } = useLanguageContext();

  return (
    <>
      <div className="py-[64px] lg:py-[104px] flex flex-col w-full">
        <div className="text-center flex flex-col items-center mb-[64px]">
          <p className="landing-text-color px-2 text-h4 lg:text-h2 lg:text-display-2">
            {title[lan]}
          </p>
          <p className="max-w-[297px] font-light text-lg text-[#FFFFFFB8] mt-[16px]">
            {subTitle[lan]}
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-[24px]">
          {graphics.map((g, k) => (
            <div
              key={k}
              className="w-fit max-w-[640px] mx-auto flex flex-col items-center gap-[12px] rounded-3xl border-[1px] border-[rgba(255,255,255,0.04)] overflow-clip"
            >
              <img
                src={g.icon}
                alt={g.title[lan]}
                className="max-w-full w-full"
              />
              <div className="p-6">
                <p className="landing-text-color pb-3 font-medium text-[20px]">
                  {g.title[lan]}
                </p>
                <p className="text-[16px] font-extralight text-[#FFFFFFB8]">
                  {g.text[lan]}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="py-[64px] lg:py-[104px] gap-[20px] lg:gap-[40px] flex flex-col items-center justify-between xl:flex-row w-full">
        <div className="flex flex-col gap-[24px] lg:gap-[32px] max-w-[585px]">
          <p className="landing-text-color text-sm uppercase">{title[lan]}</p>
          <div>
            <p className="text-h4 lg:text-h2 mb-2">
              {winningMarkets.title[lan][0]}{" "}
              <span className="landing-text-color">
                {winningMarkets.title[lan][1]}
              </span>{" "}
              {winningMarkets.title[lan][2]}
            </p>
            <p className="text-[#FFFFFFB8] font-light text-[15px] max-w-[518px]">
              {winningMarkets.subtitle[lan]}
            </p>
          </div>
          <ul className="gap-2 flex flex-col">
            {winningMarkets.bulletPoints[lan].map((b: any, k: Key) => (
              <li
                key={k}
                className={`text-[#FFFFFFB8] mb-2 relative text-[15px] before:absolute
                before:content-[url(assets/images/landing/markets/checkCircleBlue.png)] ml-8 before:left-[-32px]`}
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
        <img
          src={winningMImg}
          className="w-full max-w-[679px] h-full mt-[64px] lg:mt-0"
        />
      </div>
      <div className="py-[64px] lg:py-[104px] gap-[20px] lg:gap-[40px] flex flex-col-reverse items-center justify-between xl:flex-row w-full">
        <img
          src={winningPImg}
          className="w-full max-w-[679px] h-full mt-[64px] lg:mt-0"
        />
        <div className="flex flex-col gap-[24px] lg:gap-[32px] max-w-[585px]">
          <p className="landing-text-color text-sm uppercase">
            {titleProducts[lan]}
          </p>
          <div>
            <p className="text-h4 lg:text-h2 mb-2">
              {winningProducts.title[lan][0]}{" "}
              <span className="landing-text-color">
                {winningProducts.title[lan][1]}
              </span>
            </p>
            <p className="text-[#FFFFFFB8] font-light text-[15px] max-w-[518px]">
              {winningProducts.subtitle[lan]}
            </p>
          </div>
          <ul className="gap-2 flex flex-col">
            {winningProducts.bulletPoints[lan].map((b: any, k: Key) => (
              <li
                key={k}
                className={`text-[#FFFFFFB8] mb-2 relative text-[15px] before:absolute
                before:content-[url(assets/images/landing/markets/checkCircleBlue.png)] ml-8 before:left-[-32px]`}
              >
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

const title: any = {
  en: "Winning Markets",
  fr: "Marchés Gagnants",
};
const titleProducts: any = {
  en: "Winning products",
  fr: "Produits Gagnants",
};
const subTitle: any = {
  en: "Spot winning markets and products with AI",
  fr: "Repérez les marchés et produits gagnants avec l'IA",
};
const graphics: any[] = [
  {
    icon: graphicsImg1,
    title: { en: "Anticipate trends", fr: "Anticipez les tendances" },
    text: {
      en: "Anticipate market trends with AI for a strategic advantage over the competition.",
      fr: "Anticipez les tendances du marché grâce à l'IA pour un avantage stratégique sur la concurrence.",
    },
  },
  {
    icon: graphicsImg2,
    title: { en: "Make the right decision", fr: "Prenez les bonnes décisions" },
    text: {
      en: "Identify high-performing channels and adjust strategy to optimise results.",
      fr: "Identifiez les canaux performants, et ajustez la stratégie pour optimiser les résultats.",
    },
  },
  {
    icon: graphicsImg3,
    title: {
      en: "Discover the nuggets of the day",
      fr: "Découvrez les pépites du jour",
    },
    text: {
      en: "Explore product trends for a complete view of opportunities.",
      fr: "Explorez les tendances liées aux produits pour une vision complète des opportunités.",
    },
  },
];
const winningMarkets: any = {
  title: {
    en: {
      0: "Strengthen",
      1: "your strategy",
      2: "and identify growing markets",
    },
    fr: {
      0: "Musclez",
      1: "votre stratégie",
      2: "et identifiez les marchés porteurs",
    },
  },
  subtitle: {
    en: "Follow market trends before they explode. Be first to launch viral products.",
    fr: "Suivez les tendances des marchés avant qu'ils n'explosent. Soyez premier à lancer des produits viraux.",
  },
  bulletPoints: {
    en: [
      "Launch winning products before the competition",
      "Identify bestsellers accurately",
      "Minimize ad testing costs",
    ],
    fr: [
      "Lancer les produits gagnants avant la concurrence",
      "Identifiez les best-sellers avec précision",
      "Minimisez les coûts de test publicitaire",
    ],
  },
  img: winningMImg,
};
const winningProducts: any = {
  title: {
    en: {
      0: "Discover product turnover using our",
      1: "AI",
    },
    fr: {
      0: "Découvrez le chiffre d'affaire des produits grâce à notre",
      1: "IA",
    },
  },
  subtitle: {
    en: "Sort and filter products with ease, based on growth, revenue, customer reviews, and other relevant criteria.",
    fr: "Triez et filtrez les produits avec facilité, basé sur la croissance, le chiffre d'affaires, les évaluations clients, et d'autres critères pertinents.",
  },
  bulletPoints: {
    en: [
      "Identify the winning products from the last 3 months",
      "Predict the future success of a product over 1 year",
      "Filter the products by the turnover achieved",
    ],
    fr: [
      "Identifiez les produits gagnants des 3 derniers mois",
      "Prédisez le succès futur d'un produit sur 1 an",
      "Filtrez les produits par le chiffre d'affaire réalisé",
    ],
  },
  img: winningPImg,
};
