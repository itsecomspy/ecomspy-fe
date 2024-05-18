import { useLanguageContext } from "@root/src/context/LanguageContext";
import { Key } from "react";
import styled from "styled-components";

const SettingsTabsWrapper = styled.div`
  display: flex;
  padding-bottom: 4px;
  align-items: flex-start;
  gap: 10px;
  width: 100%;
  overflow-x: scroll;
  @media screen and (max-width: 479px) {
    padding: 16px 16px 8px;
  }
`;
const TabsWrapper = styled.div<{
  $selcted?: boolean;
}>`
  font-size: 14px;
  white-space: pre;
  height: 36px;
  padding: 8px 12px;
  border-radius: 1000px;
  cursor: pointer;
  border: ${(props) =>
    props.$selcted
      ? "1px solid rgba(255, 255, 255, 0.03)"
      : "1px solid rgba(255, 255, 255, 0)"};
  color: ${(props) => (props.$selcted ? "white" : "rgba(255, 255, 255, 0.72)")};
  background: ${(props) =>
    props.$selcted ? "rgba(255, 255, 255, 0.04)" : "transparent"};
  line-height: 0;
  display: flex;
  align-items: center;
  &:hover {
    background: rgba(255, 255, 255, 0.04);
  }
`;

export const SettingsTabs = ({
  active,
  handleTabSwtich,
}: {
  active: number;
  handleTabSwtich: (arg0: any) => void;
}) => {
  const { lan } = useLanguageContext();

  const tabComponents: any = [
    {
      id: 0,
      text: { en: "Personal Information", fr: "Informations Personnelles" },
    },
    // {
    //   id: 1,
    //   text: { en: "Billing & Invoices", fr: "Facturation et Factures" },
    // },
    {
      id: 2,
      text: { en: "Subscription", fr: "Abonnement" },
    },
    {
      id: 3,
      text: { en: "Support", fr: "Soutien" },
    },
  ];

  return (
    <div className="w-full flex pb-2">
      <SettingsTabsWrapper>
        {tabComponents.map((item: any, i: Key) => (
          <TabsWrapper
            key={i}
            $selcted={active === item.id}
            onClick={() => handleTabSwtich(item.id)}
          >
            {item.text[lan]}
          </TabsWrapper>
        ))}
      </SettingsTabsWrapper>
    </div>
  );
};
