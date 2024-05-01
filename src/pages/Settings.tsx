import React from "react";
import { Layout } from "../components/layout/Layout";
import {
  SettingsTabs,
  PersonalInfo,
  Billing,
  Subscription,
  Support,
} from "../components/pages/Settings";
import { useLocation, useNavigate } from "react-router-dom";
import { Confirmation } from "@components/Confirmation";
import { useLanguageContext } from "../context/LanguageContext";

export const Settings = () => {
  const location = useLocation();

  // Component tab items and filter to display component
  const [tabItem, setTabItem] = React.useState<number>(0);
  const tabViews = [
    { id: 0, component: <PersonalInfo key={0} /> },
    // { id: 1, component: <Billing key={1} /> },
    { id: 2, component: <Subscription key={2} /> },
    { id: 3, component: <Support key={3} /> },
  ];
  const componentToDisplay = tabViews.map((tab) => {
    if (tab.id === tabItem) {
      return tab.component;
    }
  });

  // Set tab based on props if it exists in state-history
  React.useMemo(() => {
    if (location.state?.tab === "subscription") {
      setTabItem(2);
    }
    if (location.state?.tab === "support") {
      setTabItem(3);
    }
  }, [location.state]);

  // Handle cancel message notification and action
  const [open, setOpen] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const { lan } = useLanguageContext();
  React.useMemo(() => {
    if (location.search.includes("canceled")) {
      setOpen(true);
    }
  }, [location]);

  return (
    <Layout>
      {open && (
        <Confirmation
          error
          handleClose={() => setOpen(false)}
          action={() => navigate("/settings")}
          text={failedSubtext[lan]}
          title={failedText[lan]}
        />
      )}
      <SettingsTabs active={tabItem} handleTabSwtich={setTabItem} />
      <>{componentToDisplay}</>
    </Layout>
  );
};

const failedText: any = {
  en: "Subscription failed",
  fr: "Échec de l'abonnement",
};
const failedSubtext: any = {
  en: "The subscription was not complete. Please try again",
  fr: "L'abonnement n'était pas complet. Veuillez réessayer",
};
