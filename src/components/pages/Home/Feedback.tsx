import { Key } from "react";
import styled from "styled-components";
import { useLanguageContext } from "@root/src/context/LanguageContext";
import {
  feedback1,
  feedback2,
  feedback3,
  feedback4,
  feedback5,
  feedback6,
  feedback7,
} from "@assets/images/landing/markets";
import pattern from "@assets/images/landing/landing-pattern.png";

const CardWrapper = styled.div`
  display: inline-flex;
  padding: 32px;
  flex-direction: column;
  align-items: flex-start;
  gap: 32px;
  border-radius: 16px;
  border: 1px solid rgba(255, 255, 255, 0.08);
  background: rgba(255, 255, 255, 0.03);
  @media screen and (max-width: 1024px) {
    padding: 16px;
  }
`;

export const Feedback = () => {
  const { lan } = useLanguageContext();

  return (
    <div className="relative py-[64px] lg:py-[104px] flex flex-col w-full">
      <img
        src={pattern}
        alt="landing page pattern overlay"
        className="pointer-events-none absolute object-cover z-10 left-0 top-0 w-[100vw] h-[auto] object-left-top max-w-[200vw]"
      />
      <div className="relative z-10 text-center flex flex-col items-center mb-[64px]">
        <p className="landing-text-color mb-4 text-sm uppercase">
          {header[lan]}
        </p>
        <p className="max-w-[608px] text-h4 lg:text-h2 lg:text-display-2">
          {title[lan]}
        </p>
        <p className="max-w-[546px] font-light text-lg text-[#FFFFFFB8] mt-[16px]">
          {subTitle[lan]}
        </p>
      </div>
      <div className="relative z-10 md:flex gap-[24px] items-center">
        <div className="w-full max-w-[419px] flex flex-col gap-[24px] mx-auto mb-6">
          {feedback
            .map((f: any, k: Key) => (
              <CardWrapper key={k}>
                <p className="text-[15px] font-light text-[#FFFFFFB8]">
                  {f.text[lan]}
                </p>
                <div className="flex gap-3 items-center">
                  <img
                    src={f.img}
                    alt={f.text[lan]}
                    className="w-[56px] h-[56px] rounded-lg"
                  />
                  <div>
                    <p className="text-[15px] font-medium">{f.name}</p>
                    <p className="text-sm text-[#FFFFFFB8]">
                      {f.subs}K {f.subText[lan]}
                    </p>
                  </div>
                </div>
              </CardWrapper>
            ))
            .slice(0, 2)}
        </div>
        <div className="w-full max-w-[419px] flex flex-col gap-[24px] mx-auto mb-6">
          {feedback
            .map((f: any, k: Key) => (
              <CardWrapper key={k}>
                <p className="text-[15px] font-light text-[#FFFFFFB8]">
                  {f.text[lan]}
                </p>
                <div className="flex gap-3 items-center">
                  <img
                    src={f.img}
                    alt={f.text[lan]}
                    className="w-[56px] h-[56px] rounded-lg"
                  />
                  <div>
                    <p className="text-[15px] font-medium">{f.name}</p>
                    <p className="text-sm text-[#FFFFFFB8]">
                      {f.subs}K {f.subText[lan]}
                    </p>
                  </div>
                </div>
              </CardWrapper>
            ))
            .slice(2, 5)}
        </div>
        <div className="w-full max-w-[419px] flex flex-col gap-[24px]">
          {feedback
            .map((f: any, k: Key) => (
              <CardWrapper key={k}>
                <p className="text-[15px] font-light text-[#FFFFFFB8]">
                  {f.text[lan]}
                </p>
                <div className="flex gap-3 items-center">
                  <img
                    src={f.img}
                    alt={f.text[lan]}
                    className="w-[56px] h-[56px] rounded-lg"
                  />
                  <div>
                    <p className="text-[15px] font-medium">{f.name}</p>
                    <p className="text-sm text-[#FFFFFFB8]">
                      {f.subs}K {f.subText[lan]}
                    </p>
                  </div>
                </div>
              </CardWrapper>
            ))
            .slice(5, 7)}
        </div>
      </div>
    </div>
  );
};

const title: any = {
  en: "Trusted by the best Entrepreneurs",
  fr: "+ De 10 000 Entrepreneurs nous font confiance",
};
const header: any = {
  en: "testimonials",
  fr: "témoignages",
};
const subTitle: any = {
  en: "The favorite solution for e-commerce enthusiasts",
  fr: "La solution préférée des passionnés d'e-commerce",
};
const feedback: any = [
  {
    text: {
      en: `“The only tool I use for all my product research on Facebook and TikTok is Ecomspy.”`,
      fr: `“Le seul outil que j'utilise pour toutes mes recherches produits sur Facebook et TikTok, c'est Ecomspy.”`,
    },
    name: "AC Hampton",
    subs: 325,
    subText: {
      en: "Subscribers",
      fr: "Abonnés",
    },
    img: feedback1,
  },
  {
    text: {
      en: `“For Facebook ads, Ecomspy is a gold mine, giving me the ability to access other social networks and launch my future winning products.”`,
      fr: `“Pour les publicités Facebook, Ecomspy est une mine d'or, m'offrant la possibilité d'accéder à d'autres réseaux sociaux et de lancer mes futurs produits gagnants.”`,
    },
    name: "Sebastian Esqueda",
    subs: 165,
    subText: {
      en: "Subscribers",
      fr: "Abonnés",
    },
    img: feedback2,
  },
  {
    text: {
      en: `"My favorite product research tool is EcomSpy. I really like all the features it offers."`,
      fr: `“Mon outil de recherche de produits préféré est EcomSpy. J'apprécie vraiment toutes les fonctionnalités qu'il propose."`,
    },
    name: "Austin Rabin",
    subs: 115,
    subText: {
      en: "Subscribers",
      fr: "Abonnés",
    },
    img: feedback3,
  },
  {
    text: {
      en: `"EcomSpy not only allows you to see a large number of product ideas, but also to search and review Facebook ads. You can search by keyword if you want to explore an industry."`,
      fr: `“EcomSpy vous permet non seulement de voir un grand nombre d'idées de produits, mais aussi d'effectuer des recherches et d'examiner les publicités Facebook. Vous pouvez effectuer une recherche par mot-clé si vous souhaitez explorer un secteur d'activité."`,
    },
    name: "Hayden Bowles",
    subs: 308,
    subText: {
      en: "Subscribers",
      fr: "Abonnés",
    },
    img: feedback4,
  },
  {
    text: {
      en: `"I'm an active user of EcomSpy myself. It's so easy to validate a product and get the proof of concept you need before actually testing the product."`,
      fr: `“J'utilise moi-même activement EcomSpy. Il est si facile de valider un produit et d'obtenir la preuve de concept dont vous avez besoin avant de tester réellement le produit."`,
    },
    name: "Nathan Nazareth",
    subs: 236,
    subText: {
      en: "Subscribers",
      fr: "Abonnés",
    },
    img: feedback5,
  },
  {
    text: {
      en: `“This is my favorite ad spy tool. The cool thing about this tool is that you can look at Facebook ads and predict which markets and products will be successful in the future.”`,
      fr: `“C'est mon outil d'espionnage publicitaire préféré. Ce qui est cool avec cet outil, c'est qu'on peut regarder les publicités Facebook et prédire les marchés et les produits qui auront un succès au futur.”`,
    },
    name: "Arie Scherson",
    subs: 122,
    subText: {
      en: "Subscribers",
      fr: "Abonnés",
    },
    img: feedback6,
  },
  {
    text: {
      en: `"EcomSpy has not only simplified the product discovery process, but also equipped me with a winning strategy. It is a powerful tool that has become an integral part of my business operations."`,
      fr: `“EcomSpy a non seulement simplifié le processus de découverte des produits, mais m'a également doté d'une stratégie gagnante. C'est un outil puissant qui fait désormais partie intégrante de mes activités commerciales."`,
    },
    name: "Sara Phineas",
    subs: 465,
    subText: {
      en: "Subscribers",
      fr: "Abonnés",
    },
    img: feedback7,
  },
];
