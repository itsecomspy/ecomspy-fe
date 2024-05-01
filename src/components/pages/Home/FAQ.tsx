import React, { Key } from "react";
import styled from "styled-components";
import { useLanguageContext } from "@root/src/context/LanguageContext";
import { PiCaretDown } from "react-icons/pi";

const Accordion = styled.div<{
  $open: boolean;
}>`
  margin: auto;
  max-width: 906px;
  width: 100%;
  border-bottom: 1px solid #ffffff1f;
  transition: transform 0.25s;
  transform: rotate(0deg);
  padding-bottom: 24px;
  white-space: pre-line;
  &:last-of-type {
    border-bottom: none;
  }
  & .icon-class {
    ${(props) =>
      props.$open
        ? `
  transform: rotate(180deg);
  transition: transform .25s;
  `
        : ``}
  }
`;

const BgColor = styled.div`
  background-color: #0b0e22;
  height: 100%;
  width: 300vw;
  position: absolute;
  inset: 0;
  left: -100vw;
  z-index: 0;
`;

const AccordionComponent = ({ q, a }: { q: string; a: string }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  return (
    <Accordion $open={open}>
      <div
        onClick={() => setOpen(!open)}
        className="flex w-full justify-between items-start cursor-pointer"
      >
        <p>{q}</p>
        <PiCaretDown className="icon-class min-w-6 min-h-6" fontSize={24} />
      </div>
      {open && <div className="text-[#FFFFFFB8] mt-8">{a}</div>}
    </Accordion>
  );
};

export const FAQ = () => {
  const { lan } = useLanguageContext();

  return (
    <div className="relative py-[64px] lg:py-[104px] flex flex-col w-full">
      <BgColor />
      <div className="relative z-10 text-center flex flex-col items-center mb-[64px]">
        <p className="landing-text-color mb-4 text-sm uppercase">
          {subtitle[lan]}
        </p>
        <p className="px-2 max-w-[594px] text-h4 lg:text-h2 lg:text-display-2">
          {title[lan]}
        </p>
      </div>
      <div className="relative z-10 flex flex-col items-center lg:items-stretch gap-6">
        {qanda.map((data: any, k: Key) => (
          <AccordionComponent key={k} q={data.q[lan]} a={data.a[lan]} />
        ))}
      </div>
    </div>
  );
};

const title: any = {
  en: "Frequently Asked Questions",
  fr: "Questions Fréquentes",
};
const subtitle: any = {
  en: "Not convinced yet?",
  fr: "Pas encore convaincu?",
};

const qanda = [
  {
    q: {
      en: "Why should I use EcomSpy when I can use other tools?",
      fr: "Pourquoi devrai-je utiliser EcomSpy quand je peux utiliser d'autres outils?",
    },
    a: {
      en: `Unlike other tools, EcomSpy allows you to predict the growth of markets and products within a year thanks to our artificial intelligence. This allows for better results.\n
    Spying on competitors' advertising is not enough to succeed in E-commerce. With EcomSpy, we go beyond simple advertising monitoring.\n
    We provide you with in-depth analysis, trend insights, and predictive strategy, enabling you to outperform the competition and reach new heights.`,
      fr: `Contrairement aux autres outils, EcomSpy permet de prédire la croissance des marchés et produits d’ici un an grâce à notre intelligence artificielle. Cela permet d’obtenir de meilleurs résultats.\n
    Espionner la publicité des concurrents n’est pas suffisant pour réussir en E-commerce. Avec EcomSpy, nous allons au-delà de la simple surveillance publicitaire. \n
    Nous vous offrons une analyse approfondie, des insights sur les tendances, et une stratégie prédictive, vous permettant de surpasser la concurrence et d'atteindre des sommets inégalés.
    `,
    },
  },
  {
    q: { en: "What is EcomSpy used for?", fr: "À quoi sert EcomSpy?" },
    a: {
      en: `EcomSpy revolutionizes your approach to e-commerce. Using powerful artificial intelligence, it identifies market trends, predicts product growth, spies on competitive ads, and delivers in-depth analytics to propel your online success.`,
      fr: `EcomSpy révolutionne votre approche du e-commerce. En utilisant une intelligence artificielle puissante, il identifie les tendances du marché, prédit la croissance des produits, espionne les publicités concurrentes, et offre des analyses approfondies pour propulser votre succès en ligne.`,
    },
  },
  {
    q: {
      en: "Is the subscription without obligation?",
      fr: "L’abonnement est-il sans engagement?",
    },
    a: {
      en: `There is no commitment.

      You can start using EcomSpy for free today by activating your 3-day trial.
      
      Once this period ends, the subscription you chose when registering will begin.
      
      Of course, you are free to cancel your trial and subscription at any time in your account settings.
      
      And to make sure you don't forget, you'll also receive an email one day before your trial ends.`,
      fr: ` Il n'y a aucun engagement.

      Vous pouvez commencer à utiliser EcomSpy gratuitement dès aujourd'hui en activant votre essai de 3 jours.
      
      Une fois cette période terminée, l'abonnement que vous avez choisi lors de votre inscription commencera.
      
      Bien sûr, vous êtes libre d'annuler votre essai et votre abonnement à tout moment dans les paramètres de votre compte.
      
      Et pour être sûr que vous n'oubliez pas, vous recevrez également un email un jour avant la fin de votre essai.
      `,
    },
  },
  {
    q: {
      en: "What is the difference between the Premium plan and the Business?",
      fr: "Quelle est la différence entre le forfait Premium et le Business?",
    },
    a: {
      en: `With the Business plan, you have additional benefits: Unlimited Search Trends and 100 New Trending Markets Each Week. Everything you need to implement winning strategies.`,
      fr: `Avec le forfait Business, vous avez des avantages supplémentaires : Recherche Illimité de Tendance Journalières et 100 Nouveaux Marchés Tendance chaque semaine. Tout ce dont vous avez besoin pour mettre en place des stratégies gagnantes.`,
    },
  },
  {
    q: { en: "Who is it made for?", fr: "C'est fait pour qui?" },
    a: {
      en: `EcomSpy is aimed at e-commerce entrepreneurs looking to dominate their market. Whether you are a beginner or an expert, our artificial intelligence offers you an unrivaled strategy to maximize your profits and outperform the competition.`,
      fr: `EcomSpy s'adresse aux entrepreneurs e-commerce cherchant à dominer leur marché. Que vous soyez débutant ou expert, notre intelligence artificielle vous offre une stratégie inégalée pour maximiser vos profits et surpasser la concurrence.`,
    },
  },
];
