import styled from "styled-components";
import { useLanguageContext } from "@/context/LanguageContext";
import { Button } from "@components/Button";
import { Key } from "react";
import dayjs from "dayjs/esm/index.js";
import { plans as priceIds } from "@root/src/utils/subscriptionPlans";
import useBilling from "@root/src/hooks/useBilling";
import React from "react";
import { Modal } from "@components/Modal";
import { subscriptionText } from "@root/src/utils/subscriptionPlans";
import { useAuthContext } from "@root/src/context/AuthContext";

const PlanWrapper = styled.div`
  padding: 20px;
  gap: 32px;
  display: flex;
  flex-direction: column;
  border-radius: 24px;
  border: 1px solid rgba(255, 255, 255, 0.04);
  background: radial-gradient(
      89.91% 111.47% at 5.71% 0%,
      rgba(255, 255, 255, 0.08) 0%,
      rgba(255, 255, 255, 0) 100%
    ),
    rgba(255, 255, 255, 0.01);
`;

export const SubActive = ({ subscription, setSwitch }: any) => {
  const { user, userDetails } = useAuthContext();
  const { lan } = useLanguageContext();
  const planId = subscription?.planId;
  const lookupId = subscription?.lookupId;

  // Set subscription end date format)
  const renewalDate = subscription?.endDate;

  // Filter selected plan by id
  let selectedPlanDetails = plans.filter(
    (fil: { id: any }) => fil.id === planId
  )[0];

  // Get plan based on priceId
  let selectedPriceDetails = priceIds.filter(
    (fil: { lookupId: any }) => fil.lookupId === lookupId
  )[0];

  // Modal for cancel confirmation
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);
  const { onUnsubscribe, onOpenPortal, subscriptionSessionLoading } =
    useBilling();

  const handleModal = () => {
    setModalOpen(true);
  };

  const isCancelled = subscription?.cancelled || subscription?.status === "cancelled";
  let subscriptionText = isCancelled ? cancelledText[lan] : renewText[lan];

  return (
    <>
      {modalOpen && (
        <Modal
          close={() => setModalOpen(false)}
          modalConfirmationText={modalConfirmationText[lan]}
          cancelButtonText={cancelButtonText[lan]}
          actionText={confirmActionText[lan]}
          loading={subscriptionSessionLoading}
          action={() => onUnsubscribe({ userDetails, user, subscription })}
        />
      )}
      <div className="p-4 sm:p-0 flex w-full items-center gap-3">
        <hr className="w-full border-0 border-t-[1px] border-[#FFFFFF1F]" />
        <p
          className="whitespace-pre w-[350px] text-center text-xs py-2 px-3
          rounded-[100px] border-[1px] border-[#FFFFFF1F]"
        >
          {headerText[lan]}
        </p>
        <hr className="w-full border-0 border-t-[1px] border-[#FFFFFF1F]" />
      </div>
      <div
        className="pb-[20px] bg-[#FFFFFF0A] rounded-[24px] sm:w-2/4 flex flex-col
      border-[1px] border-[#FFFFFF05] mx-4 sm:mx-auto mb-[32px]"
      >
        <PlanWrapper>
          <div className="flex flex-col gap-[16px]">
            <p className="landing-text-color flex justify-between items-center text-sm uppercase">
              {selectedPlanDetails?.title}
            </p>
            <p className="text-3xl font-medium">
              ${selectedPriceDetails?.price}{" "}
              <span className="capitalize text-sm font-light text-[#FFFFFFB8]">
                {selectedPriceDetails?.billing ? perYearText[lan] : perMonthText[lan]}
              </span>
            </p>
          </div>
          <ul className="gap-2 flex flex-col mb-auto">
            {selectedPlanDetails?.bulletPoints[lan].map((b: any, k: Key) => (
              <li
                key={k}
                className={`relative text-[15px] before:absolute text-[#FFFFFFB8] font-light
                before:content-[url(assets/images/landing/markets/checkCircle.png)] ml-8 before:left-[-32px]`}
              >
                {b}
              </li>
            ))}
          </ul>
          <p className="text-sm font-light">
            <span className="font-bold">{noteText[lan]}:</span>{" "}
            {subscriptionText}{" "}
            <span className="font-bold">
              {dayjs(renewalDate).format("ddd. DD MMM, YYYY")}
            </span>
          </p>
        </PlanWrapper>

        <div className="mt-8 px-[20px] ml-auto flex gap-4">
          {isCancelled ? (
            <>
              <Button
                text={manageText[lan]}
                backgroundColor="white"
                color="black"
                action={() => onOpenPortal({ uid: user?.uid })}
              />
              <Button action={() => setSwitch(true)} text={newplanText[lan]} />
            </>
          ) : (
            <>
              <Button
                text={cancelText[lan]}
                backgroundColor="white"
                color="black"
                action={handleModal}
              />
              <Button action={() => setSwitch(true)} text={switchText[lan]} />
            </>
          )}
        </div>
      </div>
    </>
  );
};

const headerText: any = {
  en: "Your Subscription",
  fr: "Votre abonnement",
};
const switchText: any = {
  en: "Switch Subscription",
  fr: "Changer d'abonnement",
};
const cancelText: any = {
  en: "Cancel Subscription",
  fr: "Annuler l'abonnement",
};
const noteText: any = {
  en: "NOTE",
  fr: "REMARQUE",
};
const renewText: any = {
  en: "Your current subscription is active. It will automatically renew on",
  fr: "Votre abonnement actuel est actif. Il se renouvellera automatiquement le",
};
const cancelledText: any = {
  en: "Your current subscription is cancelled. It will end on",
  fr: "Votre abonnement actuel est annulé. Cela se terminera le",
};

const plans: any = [
  {
    title: "starter",
    id: 1,
    bulletPoints: subscriptionText.starter,
  },
  {
    title: "premium",
    id: 2,
    bulletPoints: subscriptionText.premium,
  },
  {
    title: "business",
    id: 3,
    bulletPoints: subscriptionText.business,
  },
];
const perMonthText: any = { en: "per month", fr: "par mois" };
const perYearText: any = { en: "per year", fr: "par an" };

const modalConfirmationText: any = {
  en: "Are you sure you want to cancel your subscription?",
  fr: "Êtes-vous sûr de vouloir annuler votre abonnement?",
};

const cancelButtonText: any = {
  en: "Close",
  fr: "Fermer",
};
const confirmActionText: any = {
  en: "Yes, Cancel",
  fr: "Oui",
};
const newplanText: any = {
  en: "Select New Plan",
  fr: "Sélectionnez un nouveau forfait",
};
const manageText: any = {
  en: "Manage Subscription",
  fr: "Gérer l'abonnement",
};
