import React, { Key } from "react";
import styled from "styled-components";
import { useLanguageContext } from "@root/src/context/LanguageContext";
import { Button } from "@components/Button";
import { useNavigate } from "react-router-dom";
import { setWithExpiry } from "@root/src/utils/functions";
import { useAuthContext } from "@root/src/context/AuthContext";
import { subscriptionText } from "@root/src/utils/subscriptionPlans";

const PlanWrapper = styled.div<{
  $middle: boolean;
}>`
  max-width: 418.67px;
  width: 100%;
  padding: 40px 24px;
  gap: 32px;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  background: ${(props) =>
    props.$middle
      ? "#3A44E4"
      : `radial-gradient(
      89.91% 111.47% at 5.71% 0%,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    rgba(255, 255, 255, 0.01)`};
`;

export const Plans = ({ freeTrial }: { freeTrial?: boolean }) => {
  const { lan } = useLanguageContext();
  const [selected, setSelected] = React.useState<number>(0);
  const navigate = useNavigate();
  const { user } = useAuthContext();

  const handleClick = () => {
    if (freeTrial) {
      // Save freeTrial value and set expiry for after 1 day
      setWithExpiry({ key: "trial", value: true, ttl: 86400 });
    }
    // Check if user is authenticated
    if (user) {
      return navigate("/settings", { state: { tab: "subscription" } });
    }
    navigate("/register", { state: { tab: "subscription" } });
  };

  const textToDisplay = freeTrial ? freeTrialText[lan] : title[lan];

  return (
    <div className="py-[64px] lg:py-[104px] flex flex-col w-full">
      <div className="text-center flex flex-col items-center">
        <p className="landing-text-color mb-4 text-sm uppercase">
          {subHeader[lan]}
        </p>
        <p className="px-6 max-w-[738px] text-h4 lg:text-h2 lg:text-display-2 mb-2">
          {textToDisplay[0]}{" "}
          <span className="landing-text-color">{textToDisplay[1]}</span>{" "}
          {textToDisplay[2]}
        </p>
        <p className="text-[15px] text-[#FFFFFFB8]">{subtitle[lan]}</p>
      </div>
      <div className="my-[32px] lg:my-[64px] w-max mx-auto p-2 flex border-[1px] border-[#FFFFFF20] rounded-[100px]">
        {plansType.map((p: any, i: any) => (
          <div
            key={i}
            style={
              selected === i
                ? {
                    background:
                      "linear-gradient(109.62deg, #2D55FB 33.2%, #30A7CF 100%)",
                  }
                : {}
            }
            className={`${
              selected === i
                ? "border-[#FFFFFF08] rounded-[100px]"
                : "border-[transparent]"
            } border-[1px] py-1 px-2 cursor-pointer`}
            onClick={() => setSelected(i)}
          >
            <p
              className={`text-[15px] ${
                selected === i ? "text-white" : "font-extralight"
              }`}
            >
              {p[lan]}
            </p>
          </div>
        ))}
      </div>
      <div className="md:flex gap-[24px] items-center">
        <div className="w-full flex flex-wrap xl:flex-nowrap justify-center gap-[24px] mx-auto mb-6">
          {plans.map((p: any, i: any) => (
            <PlanWrapper $middle={i === 1} key={i}>
              <div className="flex flex-col gap-[16px]">
                <p
                  className={`${
                    i === 1 ? "text-white" : "landing-text-color"
                  } flex justify-between items-center text-sm uppercase`}
                >
                  {p.title}
                  {i === 1 && (
                    <span className="bg-[#0D0D123D] capitalize py-1 px-2 rounded-[100px] text-white font-light text-[15px]">
                      {p.popularText[lan]}
                    </span>
                  )}
                </p>
                <p className="text-3xl lg:text-h2">
                  ${selected === 0 ? p.monthPrice : p.yearPrice}{" "}
                  <span className="capitalize text-base font-light text-[#FFFFFFB8]">
                    {p.perMonthText[lan]}
                  </span>
                </p>
              </div>
              <ul className="gap-2 flex flex-col mb-auto">
                {p.bulletPoints[lan].map((b: any, k: Key) => (
                  <li
                    key={k}
                    className={`relative text-[15px] before:absolute text-[#FFFFFFB8] font-light
                before:content-[url(assets/images/landing/markets/${
                  i === 1 ? "checkCircle.png" : "checkCircleBlue.png"
                })] ml-8 before:left-[-32px]`}
                  >
                    {b}
                  </li>
                ))}
              </ul>
              <Button
                text={freeTrial ? freeTrialButton[lan] : p.buttonText[lan]}
                backgroundColor={i === 1 ? "#FFFFFF" : "#FFFFFF08"}
                color={i === 1 ? "#101675" : "#FFFFFF"}
                border="1px solid #FFFFFF08"
                size="large"
                action={handleClick}
              />
            </PlanWrapper>
          ))}
        </div>
      </div>
    </div>
  );
};

const title: any = {
  en: { 0: "The only", 1: "subscription", 2: "that you will need" },
  fr: { 0: "Le seul", 1: "abonnement", 2: "dont vous aurez besoin" },
};
const subHeader: any = {
  en: "pricing",
  fr: "prix",
};
const subtitle: any = {
  en: "Follow market trends before they explode",
  fr: "Suivez les tendances du marché avant qu'elles n'explosent",
};
const plansType: any = [
  { en: "Monthly plan", fr: "Plan mensuel" },
  { en: "Annual plan", fr: "Plan Annuel" },
];
const freeTrialText: any = {
  en: "Get started with your 3-day free trial now",
  fr: "Commencez dès maintenant avec votre essai gratuit de 3 jours",
};
const freeTrialButton: any = {
  en: "Get Started",
  fr: "Démarrer",
};
const plans: any = [
  {
    title: "starter",
    monthPrice: 49,
    yearPrice: 29,
    perMonthText: { en: "per month", fr: "par mois" },
    buttonText: { en: "select plan", fr: "sélectionnez le plan" },
    bulletPoints: subscriptionText.starter,
  },
  {
    title: "premium",
    monthPrice: 79,
    yearPrice: 59,
    perMonthText: { en: "per month", fr: "par mois" },
    buttonText: { en: "select plan", fr: "sélectionnez le plan" },
    popularText: { en: "Popular plan", fr: "Plan populaire" },
    bulletPoints: subscriptionText.premium,
  },
  {
    title: "business",
    monthPrice: 99,
    yearPrice: 79,
    perMonthText: { en: "per month", fr: "par mois" },
    buttonText: { en: "select plan", fr: "sélectionnez le plan" },
    bulletPoints: subscriptionText.business,
  },
];
