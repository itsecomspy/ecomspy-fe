import React, { useCallback } from "react";
import axios from "axios";
import usePaddle from "./usePaddle";
import firebaseService from "../services/firebase.service";

const billingProvider = (import.meta.env.VITE_BILLING_PROVIDER || "paddle").toLowerCase();
const isPolarProvider = billingProvider === "polar";
const isDodoProvider = billingProvider === "dodo";
const defaultFunctionsBase = import.meta.env.VITE_FIREBASE_PROJECT_ID ?
  `https://us-central1-${import.meta.env.VITE_FIREBASE_PROJECT_ID}.cloudfunctions.net` :
  "";
const functionsBaseUrl = import.meta.env.VITE_FUNCTIONS_BASE_URL || "";
const apiBaseUrl = (
  import.meta.env.VITE_BILLING_API_BASE_URL ||
  functionsBaseUrl ||
  defaultFunctionsBase
).replace(/\/$/, "");

const resolveUrl = (path: string) => `${apiBaseUrl}/${path}`;

const getManagedProvider = (subscriptionProvider?: string, hasSubscription?: boolean) => {
  if (subscriptionProvider === "polar") return "polar";
  if (subscriptionProvider === "dodo") return "dodo";
  if (isPolarProvider) return "polar";
  if (isDodoProvider) return "dodo";
  if (hasSubscription) return "dodo";
  return "paddle";
};

export default function useBilling() {
  const paddle = usePaddle();
  const {
    onPaymentIntent: paddleOnPaymentIntent,
    onSuccess: paddleOnSuccess,
    retrieveSubscriptionData: paddleRetrieveSubscriptionData,
    onCurrentPlanChange: paddleOnCurrentPlanChange,
    onUnsubscribe: paddleOnUnsubscribe,
  } = paddle;
  const [loading, setLoading] = React.useState<boolean>(false);
  const [subscriptionSessionLoading, setSubscriptionSessionLoading] = React.useState<boolean>(false);
  const [successComplete, setSuccessComplete] = React.useState<boolean>(false);

  const onPaymentIntent = useCallback(
    async ({ lookupKey, navigate, uid, email, customerName }: { lookupKey: string; navigate: any; uid?: string; email?: string; customerName?: string }) => {
      if (!isPolarProvider && !isDodoProvider) {
        return paddleOnPaymentIntent({ lookupKey, navigate });
      }

      if (!uid) {
        return;
      }

      setLoading(true);
      try {
        const createPath = isPolarProvider ?
          "createPolarCheckoutSession" :
          "createDodoCheckoutSession";
        const localStorageKey = isPolarProvider ?
          "polar_checkout_pending" :
          "dodo_checkout_pending";

        const { data } = await axios.post(resolveUrl(createPath), {
          uid,
          lookupKey,
          email,
          customerName,
        });

        localStorage.setItem(
          localStorageKey,
          JSON.stringify({
            uid,
            lookupKey,
            checkoutId: data?.checkoutId || data?.sessionId,
            createdAt: Date.now(),
          })
        );

        if (data?.checkoutUrl) {
          location.assign(data.checkoutUrl);
        }
      } finally {
        setLoading(false);
      }
    },
    [paddleOnPaymentIntent]
  );

  const onSuccess = useCallback(
    async ({ uid, checkoutId, lookupKey, txnId }: { uid: string; checkoutId?: string; lookupKey?: string; txnId?: string }) => {
      if (!isPolarProvider && !isDodoProvider) {
        return paddleOnSuccess({
          uid,
          txnId: txnId || "",
          lookupKey: lookupKey || "",
        });
      }

      if (!uid || !checkoutId || !lookupKey) {
        return;
      }

      setSubscriptionSessionLoading(true);
      try {
        await firebaseService.getDocument(`users/${uid}`);
        let confirmed = false;
        const confirmPath = isPolarProvider ?
          "confirmPolarCheckoutSession" :
          "confirmDodoCheckoutSession";
        const pendingStorageKey = isPolarProvider ?
          "polar_checkout_pending" :
          "dodo_checkout_pending";

        for (let attempt = 0; attempt < 8; attempt += 1) {
          const { data } = await axios.post(resolveUrl(confirmPath), {
            uid,
            checkoutId,
            lookupKey,
          });

          if (data?.subscriptionId || data?.status === "active") {
            confirmed = true;
            break;
          }

          await new Promise((resolve) => setTimeout(resolve, 1500));
        }

        if (!confirmed) {
          // Treat unresolved/failed checkouts as unsuccessful and route users
          // back to subscription settings instead of granting app access.
          const providerLabel = isDodoProvider ? "Dodo" : "Polar";
          console.warn(`${providerLabel} confirmation is still pending`);
          localStorage.removeItem(pendingStorageKey);
          location.replace("/settings?canceled=true");
          return;
        }

        setSuccessComplete(true);
        setTimeout(() => {
          localStorage.removeItem(pendingStorageKey);
          location.replace("/dashboard");
        }, 2000);
      } finally {
        setSubscriptionSessionLoading(false);
      }
    },
    [paddleOnSuccess]
  );

  const retrieveSubscriptionData = useCallback(
    async ({ subscriptionId, uid }: { subscriptionId?: string; uid?: string }) => {
      if (!isPolarProvider && !isDodoProvider) {
        if (!subscriptionId) {
          return null;
        }

        return paddleRetrieveSubscriptionData({
          subscriptionId: subscriptionId || "",
        });
      }

      if (!uid) {
        return null;
      }

      const path = isPolarProvider ? "getPolarSubscription" : "getDodoSubscription";
      const { data } = await axios.get(resolveUrl(path), {
        params: { uid },
      });
      return data;
    },
    [paddleRetrieveSubscriptionData]
  );

  const onCurrentPlanChange = useCallback(
    async ({
      uid,
      prorate,
      subscriptionId,
      lookupKey,
      subscriptionProvider,
    }: {
      uid: string;
      prorate?: string;
      subscriptionId?: string;
      lookupKey?: string;
      subscriptionProvider?: string;
    }) => {
      const managedProvider = getManagedProvider(subscriptionProvider, Boolean(subscriptionId));
      if (managedProvider === "paddle") {
        return paddleOnCurrentPlanChange({
          uid,
          prorate: prorate || "prorated_immediately",
          subscriptionId: subscriptionId || "",
          lookupKey: lookupKey || "",
        });
      }

      const path = managedProvider === "polar" ?
        "changePolarPlan" :
        "changeDodoPlan";

      setSubscriptionSessionLoading(true);
      try {
        await axios.post(resolveUrl(path), {
          uid,
          subscriptionId,
          lookupKey,
          prorate: prorate || "prorated_immediately",
        });
        location.reload();
      } finally {
        setSubscriptionSessionLoading(false);
      }
    },
    [paddleOnCurrentPlanChange]
  );

  const onOpenPortal = useCallback(
    async ({ uid, subscriptionProvider }: { uid: string; subscriptionProvider?: string }) => {
      if (!uid) return;
      const managedProvider = getManagedProvider(subscriptionProvider, true);
      if (managedProvider === "paddle") return;

      setSubscriptionSessionLoading(true);
      try {
        const path = managedProvider === "polar" ?
          "createPolarPortalSession" :
          "createDodoPortalSession";
        const { data } = await axios.post(resolveUrl(path), {
          uid,
        });
        if (data?.customerPortalUrl) {
          location.assign(data.customerPortalUrl);
        }
      } finally {
        setSubscriptionSessionLoading(false);
      }
    },
    []
  );

  const onUnsubscribe = useCallback(
    async ({
      userDetails,
      user,
      subscription,
    }: {
      userDetails: any;
      user: any;
      subscription?: any;
    }) => {
      const subscriptionSource = subscription || userDetails?.subscription;
      const managedProvider = getManagedProvider(
        subscriptionSource?.provider,
        Boolean(subscriptionSource?.subscriptionId)
      );
      if (managedProvider === "paddle") {
        return paddleOnUnsubscribe({ userDetails, user });
      }

      setSubscriptionSessionLoading(true);
      try {
        const path = managedProvider === "polar" ?
          "cancelPolarSubscription" :
          "cancelDodoSubscription";
        await axios.post(resolveUrl(path), {
          uid: user?.uid,
          subscriptionId: subscriptionSource?.subscriptionId,
        });
        location.replace("/settings");
      } finally {
        setSubscriptionSessionLoading(false);
      }
    },
    [paddleOnUnsubscribe]
  );

  return {
    onPaymentIntent,
    onSuccess,
    loading: (isPolarProvider || isDodoProvider) ? loading : paddle.loading,
    subscriptionSessionLoading: (isPolarProvider || isDodoProvider) ? subscriptionSessionLoading : paddle.subscriptionSessionLoading,
    successComplete: (isPolarProvider || isDodoProvider) ? successComplete : paddle.successComplete,
    onCurrentPlanChange,
    onOpenPortal,
    onUnsubscribe,
    retrieveSubscriptionData,
  };
}
