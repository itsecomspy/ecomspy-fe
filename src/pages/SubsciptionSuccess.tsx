import React from "react";
import { Loader } from "@components/Loader";
// @ts-ignore
import { Checkmark } from "react-checkmark";
import useBilling from "@root/src/hooks/useBilling";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "@root/src/context/AuthContext";

const billingProvider = (import.meta.env.VITE_BILLING_PROVIDER || "paddle").toLowerCase();
const pendingCheckoutStorageKey =
  billingProvider === "dodo" ? "dodo_checkout_pending" : "polar_checkout_pending";

export const SubsciptionSuccess = () => {
  const { onSuccess, successComplete } = useBilling();
  const location = useLocation();
  const { user } = useAuthContext();
  const routerSearchParams = new URLSearchParams(location.search);
  const browserSearchParams = new URLSearchParams(window.location.search);
  const paymentStatus = (
    routerSearchParams.get("status") ||
    browserSearchParams.get("status") ||
    ""
  )
    .trim()
    .toLowerCase();
  const isFailedPayment = paymentStatus === "failed";

  React.useEffect(() => {
    if (isFailedPayment) {
      localStorage.removeItem(pendingCheckoutStorageKey);
      const timeout = setTimeout(() => {
        window.location.replace("/settings?canceled=true");
      }, 2000);
      return () => clearTimeout(timeout);
    }

    if (user?.uid) {
      const checkoutIdFromQuery = routerSearchParams.get("session_id") ||
        routerSearchParams.get("checkout_id") ||
        routerSearchParams.get("checkoutId") ||
        browserSearchParams.get("session_id") ||
        browserSearchParams.get("checkout_id") ||
        browserSearchParams.get("checkoutId");
      const pendingCheckout = localStorage.getItem(pendingCheckoutStorageKey);
      const parsedPending = pendingCheckout ? JSON.parse(pendingCheckout) : null;

      onSuccess({
        uid: user.uid,
        txnId: location?.state?.txnId,
        checkoutId: checkoutIdFromQuery || parsedPending?.checkoutId,
        lookupKey: location?.state?.priceId || parsedPending?.lookupKey,
      });
    }
  }, [isFailedPayment, user?.uid, location.search, location?.state?.txnId, location?.state?.priceId]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {isFailedPayment ? (
        <div className="flex flex-col items-center gap-4">
          <div className="w-[100px] h-[100px] rounded-full border-4 border-[#FF4D4F] text-[#FF4D4F] flex items-center justify-center text-[56px] leading-none font-medium">
            X
          </div>
          <p className="text-[#FF4D4F] text-[16px] font-medium">Payment failed</p>
        </div>
      ) : successComplete ? (
        <Checkmark color="#3A44E4" size="100" />
      ) : (
        <Loader />
      )}
    </div>
  );
};
