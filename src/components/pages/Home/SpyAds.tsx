import { Key } from "react";
import styled from "styled-components";
import { useLanguageContext } from "@root/src/context/LanguageContext";
import card1 from "@assets/images/landing/markets/spy2.png";
import card2 from "@assets/images/landing/markets/spy1.png";

const BgColor = styled.div`
  background-color: #0b0e22;
  height: 100%;
  width: 300vw;
  position: absolute;
  inset: 0;
  left: -100vw;
  z-index: 0;
`;

const CardContainer = styled.div`
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  background: radial-gradient(
      89.91% 111.47% at 5.71% 0%,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    rgba(255, 255, 255, 0.01);
`;

export const SpyAds = () => {
  const { lan } = useLanguageContext();

  return (
    <div className="relative py-[64px] lg:py-[104px] flex flex-col w-full">
      <BgColor />
      <div className="relative z-10 text-center flex flex-col items-center mb-[64px]">
        <p className="landing-text-color mb-4 text-sm uppercase">spy ads</p>
        <p className="px-2 max-w-[838px] text-h4 lg:text-h2 lg:text-display-2">
          {title[lan][0]}{" "}
          <span className="landing-text-color">{title[lan][1]}</span>{" "}
          {title[lan][2]}
        </p>
      </div>
      <div className="relative z-10 flex flex-col lg:flex-row gap-[32px] items-center lg:items-stretch xl:gap-y-104">
        {spyAdsMap.map((s: any, k: Key) => (
          <CardContainer className="max-w-[662px] md:w-2/3 lg:w-1/2" key={k}>
            <div className="bg-[#FFFFFF05] w-full max-w-[679px] ///xl:min-h-[417px] rounded-3xl">
              <img src={s.img} alt={s.title[lan]} className="w-full" />
            </div>
            <div className="p-5 lg:p-10">
              <p className="font-medium text-2xl lg:text-h4 mb-2">
                {s.title[lan]}
              </p>
              <p className="text-sm text-[#FFFFFFB8] mb-6">{s.subtitle[lan]}</p>
              <ul className="gap-2 flex flex-col">
                {s.bulletPoints[lan].map((b: any, k: Key) => (
                  <li
                    key={k}
                    className={`relative text-[15px] before:absolute
                before:content-[url(assets/images/landing/markets/checkCircleBlue.png)] ml-8 before:left-[-32px]`}
                  >
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </CardContainer>
        ))}
      </div>
    </div>
  );
};

const title: any = {
  en: {
    0: "Take advantage of",
    1: "the largest library",
    2: "of ads and products",
  },
  fr: {
    0: "Profitez de la",
    1: "plus vaste libraire",
    2: "d'annonces et de produits",
  },
};
const spyAdsMap: any = [
  {
    title: {
      en: "Explode, Analyze, Dominate",
      fr: "Explosez, Analysez, Dominez",
    },
    subtitle: {
      en: "Access a comprehensive database of Facebook ads to analyze your competitors' strategies",
      fr: "Accédez à une base de données complète des publicités sur Facebook pour analyser les stratégies de vos concurrents",
    },
    bulletPoints: {
      en: [
        "Sort ads based on engagement",
        "Filter ads by publication date",
        "Filter ads based on targeted countries",
      ],
      fr: [
        "Triez les publicités en fonction de leur engagement",
        "Filtrez les publicités par date de publication",
        "Filtrez les publicités en fonction des pays ciblés",
      ],
    },
    img: card1,
  },
  {
    title: {
      en: "Stay ahead of your competitors",
      fr: "Ayez de l'avance sur vos conurrents",
    },
    subtitle: {
      en: "Uncover product trends and ad engagement with AI. Updates 8x/day. Identify bestsellers and avoid flops",
      fr: "Découvrez les tendances produits et l'engagement des publicités grâce à l'IA. Mises à jour 8x/jour. Identifiez les best-sellers et évitez les flops",
    },
    bulletPoints: {
      en: [
        "Spy on the audience targeted by your competitors",
        "Have an estimate of the budget spent",
        "Find out the exact duration of their advertising",
      ],
      fr: [
        "Espionnez l'audience ciblée par vos concurrents",
        "Ayez une estimation du budget dépensé",
        "Découvrez la durée exacte de leur publicité",
      ],
    },
    img: card2,
  },
];
