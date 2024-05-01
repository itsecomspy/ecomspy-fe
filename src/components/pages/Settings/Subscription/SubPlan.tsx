import React, { Key } from "react";
import styled from "styled-components";
import { useLanguageContext } from "@/context/LanguageContext";
import { Button } from "@components/Button";
import { useAuthContext } from "@root/src/context/AuthContext";
import { subscriptionText } from "@root/src/utils/subscriptionPlans";

const PlanWrapper = styled.div<{
  $middle: boolean;
}>`
  max-width: 418.67px;
  width: calc(100% / 3);
  padding: 20px;
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
  @media screen and (max-width: 1024px) {
    width: 100%;
    max-width: 318.67px;
  }
  @media screen and (max-width: 479px) {
    width: 100%;
    max-width: 100%;
  }
`;

export const SubPlan = ({
  setPlan,
  setStage,
}: {
  setPlan: any;
  setStage: any;
}) => {
  const { lan } = useLanguageContext();
  const [selected, setSelected] = React.useState<number>(0);
  const { userDetails } = useAuthContext();

  const handleSelected = ({ id }: { id: any }) => {
    setPlan(id);
    setStage(1);
  };

  const currentPlan = selected === 0 ? plansMonth : plansYear;

  return (
    <div className="mb-20 sm:mb-0">
      <div className="mb-[32px] w-max mx-auto p-2 flex border-[1px] border-[#FFFFFF20] rounded-[100px]">
        {plansType.map((p: any, i: any) => (
          <div
            key={i}
            className={`${
              selected === i
                ? "bg-[#FFFFFF] border-[#FFFFFF08] rounded-[100px]"
                : "border-[transparent]"
            } border-[1px] py-1 px-2 cursor-pointer`}
            onClick={() => setSelected(i)}
          >
            <p
              className={`text-[15px] ${
                selected === i ? "text-black" : "font-extralight"
              }`}
            >
              {p[lan]}
            </p>
          </div>
        ))}
      </div>
      <div className="md:flex gap-[24px] items-center">
        <div className="w-full flex flex-wrap xl:flex-nowrap justify-center gap-[24px] mx-auto mb-6">
          {currentPlan.map((p: any, i: any) => (
            <PlanWrapper $middle={i === 1} key={i}>
              <div className="flex flex-col gap-[16px]">
                <p
                  className={`${
                    i === 1 ? "text-white" : "landing-text-color"
                  } h-[25px] flex justify-between items-center text-sm uppercase`}
                >
                  {p.title}
                  {i === 1 && (
                    <span className="bg-[#0D0D123D] capitalize py-1 px-2 rounded-[100px] text-white text-[10px]">
                      {p.popularText[lan]}
                    </span>
                  )}
                </p>
                <p className="text-3xl font-medium">
                  ${selected === 0 ? p?.price : p?.price / 12}{" "}
                  <span className="capitalize text-sm font-light text-[#FFFFFFB8]">
                    {p.perMonthText[lan]}
                  </span>
                </p>
              </div>
              <ul className="gap-2 flex flex-col mb-auto">
                {p.bulletPoints?.[lan].map((b: any, k: Key) => (
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
                text={p.buttonText[lan]}
                backgroundColor={i === 1 ? "#FFFFFF" : "#FFFFFF08"}
                color={i === 1 ? "#101675" : "#FFFFFF"}
                border="1px solid #FFFFFF08"
                disable={
                  userDetails?.subscription?.status !== "cancelled" &&
                  userDetails?.subscription?.lookupId === p?.lookupId
                }
                action={() =>
                  handleSelected({
                    id: p.lookupId,
                  })
                }
              />
            </PlanWrapper>
          ))}
        </div>
      </div>
    </div>
  );
};

const plansType: any = [
  { en: "Monthly plan", fr: "Plan mensuel" },
  { en: "Annual plan", fr: "Plan Annuel" },
];
const plansMonth: any = [
  {
    id: 1,
    title: "starter",
    price: 39,
    lookupId: "starter_plan_liveM05042024",
    perMonthText: { en: "per month", fr: "par mois" },
    buttonText: { en: "select plan", fr: "sélectionnez le plan" },
    bulletPoints: subscriptionText.starter,
  },
  {
    id: 2,
    title: "premium",
    price: 69,
    lookupId: "premium_plan_liveM05042024",
    perMonthText: { en: "per month", fr: "par mois" },
    buttonText: { en: "select plan", fr: "sélectionnez le plan" },
    popularText: { en: "Popular plan", fr: "Plan populaire" },
    bulletPoints: subscriptionText.premium,
  },
  {
    id: 3,
    title: "business",
    price: 89,
    lookupId: "business_plan_liveM05042024",
    perMonthText: { en: "per month", fr: "par mois" },
    buttonText: { en: "select plan", fr: "sélectionnez le plan" },
    popularText: { en: "Popular plan", fr: "Plan populaire" },
    bulletPoints: subscriptionText.business,
  },
];

const plansYear: any = [
  {
    id: 1,
    title: "starter",
    price: 29 * 12,
    lookupId: "starter_plan_liveY05042024",
    perMonthText: { en: "per month", fr: "par mois" },
    buttonText: { en: "select plan", fr: "sélectionnez le plan" },
    bulletPoints: subscriptionText.starter,
  },
  {
    id: 2,
    title: "premium",
    price: 49 * 12,
    lookupId: "premium_plan_liveY05042024",
    perMonthText: { en: "per month", fr: "par mois" },
    buttonText: { en: "select plan", fr: "sélectionnez le plan" },
    popularText: { en: "Popular plan", fr: "Plan populaire" },
    bulletPoints: subscriptionText.premium,
  },
  {
    id: 3,
    title: "business",
    price: 79 * 12,
    lookupId: "business_plan_liveY05042024",
    perMonthText: { en: "per month", fr: "par mois" },
    buttonText: { en: "select plan", fr: "sélectionnez le plan" },
    popularText: { en: "Popular plan", fr: "Plan populaire" },
    bulletPoints: subscriptionText.business,
  },
];
