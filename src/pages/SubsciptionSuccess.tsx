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

  React.useEffect(() => {
    if (user?.uid) {
      const searchParams = new URLSearchParams(location.search);
      const checkoutIdFromQuery = searchParams.get("session_id") ||
        searchParams.get("checkout_id") ||
        searchParams.get("checkoutId");
      const pendingCheckout = localStorage.getItem(pendingCheckoutStorageKey);
      const parsedPending = pendingCheckout ? JSON.parse(pendingCheckout) : null;

      const uid = user.uid;
      onSuccess({
        uid,
        txnId: location?.state?.txnId,
        checkoutId: checkoutIdFromQuery || parsedPending?.checkoutId,
        lookupKey: location?.state?.priceId || parsedPending?.lookupKey,
      });
    }
  }, [user]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {successComplete ? <Checkmark color="#3A44E4" size="100" /> : <Loader />}
    </div>
  );
};
