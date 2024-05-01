import styled from "styled-components";
import { useLanguageContext } from "@/context/LanguageContext";
import { BillingTable } from "./BillingTable";
import { useAuthContext } from "@root/src/context/AuthContext";

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

const BillingWrapper = styled.div`
  padding: 24px;
  gap: 24px;
  display: flex;
  flex-direction: column;
  background: #ffffff05;
  height: 100%;
  width: 100%;
  @media screen and (max-width: 479px) {
    padding: 16px;
  }
`;

export const Billing = () => {
  const { lan } = useLanguageContext();

  // API call for billing data
  const {
    userDetails: { subscriptionHistory = [] } = {},
  } = useAuthContext();

  return (
    <Wrapper>
      <div>
        <p className="sm:pl-0 text-xl sm:text-2xl">{headerText[lan]}</p>
      </div>
      <BillingWrapper>
        <p className="">{tableText[lan]}</p>
        <BillingTable data={subscriptionHistory} />
      </BillingWrapper>
    </Wrapper>
  );
};

const headerText: any = {
  en: "Billing & Invoices",
  fr: "Facturation et Factures",
};
const tableText: any = {
  en: "Billing history",
  fr: "Historique de facturation",
};
