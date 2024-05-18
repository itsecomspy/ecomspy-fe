import { getPlanByLookupId } from "@root/src/utils/subscriptionPlans";
import { FaLock } from "react-icons/fa";

export const ChangePlanModal = ({
  lan,
  annual,
  newPlan,
  currentPlan,
}: {
  newPlan: any;
  lan: "en" | "fr";
  annual?: boolean;
  currentPlan: any;
}) => {
  const plan = getPlanByLookupId(currentPlan);

  const title = planTypes?.[plan?.planId - 1]?.title;
  const price = plan?.price;
  const proratedPrice =
    newPlan?.price > plan?.price ? newPlan?.price - plan?.price : 0;

  const perMonthText = `${annual ? newPlan?.price / 12 : newPlan?.price} / mo.`;
  const planText = (
    <>
      1 x{" "}
      <span className="capitalize font-medium text-white">
        {newPlan?.title} plan
      </span>{" "}
      (${perMonthText})
    </>
  );

  return (
    <div className="text-white flex flex-col gap-4 text-left">
      <p className="text-xl text-center text-[16px]">
        {modalConfirmationText[lan]}
      </p>
      <div className="py-4 w-full">
        <div className="flex justify-between w-full items-baseline">
          <p className="font-medium text-[16px] capitalize">{title} plan</p>
          <p className="mt-2 text-[#FFFFFFB8] text-[16px]">${price}</p>
        </div>
        <p className="mt-2 text-[#FFFFFFB8] text-sm">
          {plan?.billing ? billingAnnually[lan] : billingMonthly[lan]}
        </p>
      </div>
      <div className="border-t border-y-[rgba(255,255,255,25%)] pt-4 w-full">
        <p className="font-medium text-[16px]">{newPlanText[lan]}</p>
        <div className="flex justify-between w-full items-baseline">
          <p className="mt-2 text-[#FFFFFFB8] text-sm">{planText}</p>
          <p className="mt-2 text-[#FFFFFFB8] text-[16px]">${newPlan?.price}</p>
        </div>
      </div>
      <div className="w-full pb-4">
        <div className="flex justify-between w-full items-baseline">
          <p className="font-medium text-[16px]">{proratedText[lan]}</p>
          <p
            className={`mt-2 text-[#FFFFFFB8] text-[16px]
          ${newPlan?.price > plan?.price && "text-[#1FAB7F]"}
          `}
          >
            {newPlan?.price < plan?.price ? 0 : `- $${price}`}
          </p>
        </div>
      </div>
      <div className="border-t border-y-[rgba(255,255,255,25%)] py-4 w-full">
        <div className="flex justify-between w-full items-baseline">
          <p className="font-medium text-[16px] capitalize">{dueNow[lan]}</p>
          <p className="mt-2 text-[#FFFFFFB8] text-[16px]">${proratedPrice}</p>
        </div>
        <div className="flex gap-1 mt-4 items-center">
          <FaLock size={12} className="text-[#FFFFFFB8] mt-1" />
          <p className="mt-2 text-xs text-[#FFFFFFB8]">{paymentText[lan]}</p>
        </div>
      </div>
    </div>
  );
};

const modalConfirmationText: any = {
  en: "Change subscription",
  fr: "Changer d'abonnement",
};
const proratedText: any = {
  en: "Prorated charges",
  fr: "Frais au prorata",
};
const dueNow: any = {
  en: "total due now",
  fr: "total à payer maintenant",
};
// const termsText: any = {
//   en: "By submitting this change, I agree to the Terms & Conditions and understand that my subscription charges will be updated in the next billing cycle.",
//   fr: "En soumettant cette modification, j'accepte les conditions générales et je comprends que mes frais d'abonnement seront mis à jour lors du prochain cycle de facturation.",
// };
// const errorText: any = {
//   en: "Error switching plans! Please contact support@goecomspy.com for assistance.",
//   fr: "Erreur lors du changement de forfait! Veuillez contacter support@goecomspy.com pour obtenir de l'aide.",
// };
const paymentText: any = {
  en: "All payments are secure and encrypted",
  fr: "Tous les paiements sont sécurisés et cryptés",
};
const newPlanText: any = {
  en: "Selected Plan",
  fr: "Forfait sélectionné",
};

const planTypes = [
  { title: "starter" },
  { title: "premium" },
  { title: "business" },
];

const billingAnnually: any = {
  en: "Billed annually",
  fr: "Facturé annuellement",
};
const billingMonthly: any = {
  en: "Billed monthly",
  fr: "Facturé mensuellement",
};
