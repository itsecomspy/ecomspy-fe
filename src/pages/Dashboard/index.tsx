import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
// import { useAuthContext } from "../../context/AuthContext";
import { Layout } from "../../components/layout/Layout";
import { Confirmation } from "@components/Confirmation";
import { useLanguageContext } from "../../context/LanguageContext";
import { Welcome } from "./Welcome";

export const Dashboard = () => {
  // Handle cancel message notification and action
  const [open, setOpen] = React.useState<boolean>(false);
  const navigate = useNavigate();
  const { lan } = useLanguageContext();

  // Handle subsctiption success
  const location = useLocation();
  // const { userDetails } = useAuthContext();

  React.useEffect(() => {
    if (location.state?.subscriptionSuccess) {
      setOpen(true);
    }
  }, []);

  return (
    <>
      {open && (
        <Confirmation
          handleClose={() => setOpen(false)}
          action={() => navigate("/dashboard")}
          text={successSubtext[lan]}
          title={successText[lan]}
        />
      )}
      <Layout children={<Welcome />} />
    </>
  );
};

const successText: any = {
  en: "Subscription successful",
  fr: "Abonnement réussi",
};
const successSubtext: any = {
  en: "Thank you for your subscripting to Ecomspy",
  fr: "Merci pour votre abonnement à Ecomspy",
};
