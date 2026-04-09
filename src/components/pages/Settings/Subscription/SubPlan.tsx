import React, { Key } from "react";
import styled from "styled-components";
import { useLanguageContext } from "@/context/LanguageContext";
import { useAuthContext } from "@root/src/context/AuthContext";
import { subscriptionText } from "@root/src/utils/subscriptionPlans";
import { Button, Modal } from "@components/index";
import useBilling from "@root/src/hooks/useBilling";
import { ChangePlanModal } from "./ChangePlanModal";
import { getPlanByLookupId } from "@root/src/utils/subscriptionPlans";

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
  const [selected, setSelected] = React.useState<number>(0);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const [selectedPlan, setSelectedPlan] = React.useState<any>();

  const { lan } = useLanguageContext();
  const { userDetails, user } = useAuthContext();
  const { onCurrentPlanChange, onOpenPortal, subscriptionSessionLoading } =
    useBilling();

  const handleSelected = (plan: any) => {
    setSelectedPlan(plan);
    const isPolarCancelledSubscription =
      userDetails?.subscription?.provider === "polar" &&
      Boolean(userDetails?.subscription?.subscriptionId) &&
      (userDetails?.subscription?.status === "cancelled" ||
        userDetails?.subscription?.cancelled);

    // For canceled Polar subscriptions, the source of truth is the customer
    // portal (uncancel, switch, schedule changes), not opening a new checkout.
    if (isPolarCancelledSubscription) {
      return onOpenPortal({ uid: user.uid });
    }

    if (
      userDetails?.subscription?.status === "active" &&
      userDetails?.subscription?.lookupId !== plan.lookupId
    ) {
      setModalOpen(true);
    } else {
      setPlan(plan);
      setStage(1);
    }
  };

  const currentPlan = selected === 0 ? plansMonth : plansYear;

  const lookupPlan = getPlanByLookupId(selectedPlan?.lookupId);
  const prorationType =
    userDetails?.subscription?.billing > lookupPlan?.billing
      ? "prorated_immediately"
      : userDetails?.subscription?.price > selectedPlan?.price
      ? "do_not_bill"
      : "prorated_immediately";

  return (
    <>
      {modalOpen && (
        <Modal
          close={() => setModalOpen(false)}
          modalConfirmationText={
            <ChangePlanModal
              currentPlan={userDetails?.subscription?.lookupId}
              newPlan={selectedPlan}
              lan={lan}
              annual={!!selected}
            />
          }
          cancelButtonText={closeButtonText[lan]}
          actionText={confirmActionText[lan]}
          loading={subscriptionSessionLoading}
          action={() =>
            onCurrentPlanChange({
              prorate: prorationType,
              subscriptionId: userDetails?.subscription?.subscriptionId,
              lookupKey: selectedPlan.lookupId,
              uid: user.uid,
              subscriptionProvider: userDetails?.subscription?.provider,
            })
          }
        />
      )}
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
                  action={() => handleSelected(p)}
                />
              </PlanWrapper>
            ))}
          </div>
        </div>
      </div>
    </>
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
    price: 49,
    lookupId: "starter_monthly",
    perMonthText: { en: "per month", fr: "par mois" },
    buttonText: { en: "select plan", fr: "sélectionnez le plan" },
    bulletPoints: subscriptionText.starter,
  },
  {
    id: 2,
    title: "premium",
    price: 79,
    lookupId: "premium_monthly",
    perMonthText: { en: "per month", fr: "par mois" },
    buttonText: { en: "select plan", fr: "sélectionnez le plan" },
    popularText: { en: "Popular plan", fr: "Plan populaire" },
    bulletPoints: subscriptionText.premium,
  },
  {
    id: 3,
    title: "business",
    price: 99,
    lookupId: "business_monthly",
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
    price: 348,
    lookupId: "starter_yearly",
    perMonthText: { en: "per month", fr: "par mois" },
    buttonText: { en: "select plan", fr: "sélectionnez le plan" },
    bulletPoints: subscriptionText.starter,
  },
  {
    id: 2,
    title: "premium",
    price: 708,
    lookupId: "premium_yearly",
    perMonthText: { en: "per month", fr: "par mois" },
    buttonText: { en: "select plan", fr: "sélectionnez le plan" },
    popularText: { en: "Popular plan", fr: "Plan populaire" },
    bulletPoints: subscriptionText.premium,
  },
  {
    id: 3,
    title: "business",
    price: 948,
    lookupId: "business_yearly",
    perMonthText: { en: "per month", fr: "par mois" },
    buttonText: { en: "select plan", fr: "sélectionnez le plan" },
    popularText: { en: "Popular plan", fr: "Plan populaire" },
    bulletPoints: subscriptionText.business,
  },
];

const closeButtonText: any = {
  en: "Cancel",
  fr: "Annuler",
};
const confirmActionText: any = {
  en: "Confirm Change",
  fr: "Confirmer",
};
