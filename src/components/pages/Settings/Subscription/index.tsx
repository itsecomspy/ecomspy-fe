import React from "react";
import styled from "styled-components";
import { useLanguageContext } from "@/context/LanguageContext";
import { PiCheckCircleFill } from "react-icons/pi";
import { SubPayment } from "./SubPayment";
import { SubPlan } from "./SubPlan";
import { SubActive } from "./SubActive";
import { useAuthContext } from "@root/src/context/AuthContext";
import { Loader } from "@components/Loader";

const Wrapper = styled.div`
  gap: 24px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  align-content: flex-start;
  @media screen and (max-width: 479px) {
    padding: 16px;
  }
`;

export const Subscription = () => {
  const { lan } = useLanguageContext();

  const [stage, setStage] = React.useState<number>(0);
  const [switchPlan, setSwitch] = React.useState<boolean>(false);
  const [plan, setPlan] = React.useState<string>("");

  const componentToDisplay =
    stage === 0 ? (
      <SubPlan setPlan={setPlan} setStage={setStage} />
    ) : stage === 1 ? (
      <SubPayment plan={plan} />
    ) : null;

  // Get user details
  const { userDetails, subscriptionData, subscriptionLoading } =
    useAuthContext();

  // Loading screen while fetching data
  if (subscriptionLoading) {
    return <Loader />;
  }

  if (userDetails?.subscription && !switchPlan) {
    return <SubActive subscription={subscriptionData} setSwitch={setSwitch} />;
  }

  return (
    <Wrapper>
      <div>
        <p className="text-2xl">{headerText[lan]}</p>
      </div>
      <div className="flex w-full items-center gap-3">
        <hr className="w-1/2 border-0 border-t-[1px] border-[#FFFFFF1F] hidden sm:block" />
        <div
          className="w-full flex justify-between items-center
        text-sm py-2 px-3 rounded-[100px] border-[1px] border-[#FFFFFF1F]"
        >
          <p
            onClick={() => setStage(0)}
            className="cursor-pointer whitespace-pre flex items-center gap-1"
          >
            <PiCheckCircleFill
              fontSize={20}
              color={stage > 0 ? "#0EE109" : "white"}
            />
            {contactText[lan]}
          </p>
          <hr
            className={`border-t-[1px] w-[50px] sm:w-[100px] border-dashed ${
              stage < 1 ? "border-[#FFFFFF29]" : ""
            }`}
          />
          <p
            className={`flex whitespace-pre items-center gap-1 ${
              stage < 1 ? "text-[#FFFFFF66]" : ""
            }`}
          >
            <PiCheckCircleFill fontSize={20} />
            {paymentText[lan]}
          </p>
        </div>
        <hr className="w-1/2 border-0 border-t-[1px] border-[#FFFFFF1F] hidden sm:block" />
      </div>
      {componentToDisplay}
    </Wrapper>
  );
};

const headerText: any = {
  en: "Subscription",
  fr: "Abonnement",
};
const contactText: any = {
  en: "Select A Plan",
  fr: "Sélectionnez un Plan",
};
const paymentText: any = {
  en: "Payment Information",
  fr: "Informations de paiement",
};
