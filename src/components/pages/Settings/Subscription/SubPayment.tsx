import React from "react";
import { useLanguageContext } from "@/context/LanguageContext";
import useStripe from "@root/src/hooks/useStripe";
import { Loader } from "@components/Loader";

export const SubPayment = ({ plan }: { plan: any }) => {
  const { lan } = useLanguageContext();

  // Handle stripe checkout and payment
  const { onPaymentIntent } = useStripe();

  React.useEffect(() => {
    onPaymentIntent({ lookupKey: plan });
  }, []);

  return (
    <div className="p-[20px] text-center font-medium text-[15px] rounded-[24px] w-2/4 flex flex-col gap-10 mx-auto my-[32px]">
      <Loader compact />
      {headerText[lan]}
    </div>
  );
};

const headerText: any = {
  en: "Redirecting to payment page",
  fr: "Redirection vers la page de paiement",
};
