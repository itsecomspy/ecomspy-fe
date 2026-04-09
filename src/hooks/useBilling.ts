import React, { useCallback } from "react";
import axios from "axios";
import usePaddle from "./usePaddle";
import firebaseService from "../services/firebase.service";

const billingProvider = (import.meta.env.VITE_BILLING_PROVIDER || "paddle").toLowerCase();
const isPolarProvider = billingProvider === "polar";
const defaultFunctionsBase = import.meta.env.VITE_FIREBASE_PROJECT_ID ?
  `https://us-central1-${import.meta.env.VITE_FIREBASE_PROJECT_ID}.cloudfunctions.net` :
  "";
const apiBaseUrl = (import.meta.env.VITE_BILLING_API_BASE_URL || defaultFunctionsBase).replace(/\/$/, "");

const resolveUrl = (path: string) => `${apiBaseUrl}/${path}`;

export default function useBilling() {
  const paddle = usePaddle();
  const [loading, setLoading] = React.useState<boolean>(false);
  const [subscriptionSessionLoading, setSubscriptionSessionLoading] = React.useState<boolean>(false);
  const [successComplete, setSuccessComplete] = React.useState<boolean>(false);

  const onPaymentIntent = useCallback(
    async ({ lookupKey, navigate, uid, email, customerName }: { lookupKey: string; navigate: any; uid?: string; email?: string; customerName?: string }) => {
      if (!isPolarProvider) {
        return paddle.onPaymentIntent({ lookupKey, navigate });
      }

      if (!uid) {
        return;
      }

      setLoading(true);
      try {
        const { data } = await axios.post(resolveUrl("createPolarCheckoutSession"), {
          uid,
          lookupKey,
          email,
          customerName,
        });

        localStorage.setItem(
          "polar_checkout_pending",
          JSON.stringify({
            uid,
            lookupKey,
            checkoutId: data?.checkoutId,
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
    [paddle]
  );

  const onSuccess = useCallback(
    async ({ uid, checkoutId, lookupKey, txnId }: { uid: string; checkoutId?: string; lookupKey?: string; txnId?: string }) => {
      if (!isPolarProvider) {
        return paddle.onSuccess({
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

        for (let attempt = 0; attempt < 8; attempt += 1) {
          const { data } = await axios.post(resolveUrl("confirmPolarCheckoutSession"), {
            uid,
            checkoutId,
            lookupKey,
          });

          if (data?.subscriptionId || data?.status === "active" || data?.status === "cancelled") {
            confirmed = true;
            break;
          }

          await new Promise((resolve) => setTimeout(resolve, 1500));
        }

        if (!confirmed) {
          throw new Error("Polar confirmation is still pending");
        }

        setSuccessComplete(true);
        setTimeout(() => {
          localStorage.removeItem("polar_checkout_pending");
          location.replace("/dashboard");
        }, 2000);
      } finally {
        setSubscriptionSessionLoading(false);
      }
    },
    [paddle]
  );

  const retrieveSubscriptionData = useCallback(
    async ({ subscriptionId, uid }: { subscriptionId?: string; uid?: string }) => {
      if (!isPolarProvider) {
        return paddle.retrieveSubscriptionData({
          subscriptionId: subscriptionId || "",
        });
      }

      if (!uid) {
        return null;
      }

      const { data } = await axios.get(resolveUrl("getPolarSubscription"), {
        params: { uid },
      });
      return data;
    },
    [paddle]
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
      const isLikelyPolarSubscription =
        subscriptionProvider === "polar" ||
        (isPolarProvider && !subscriptionProvider && Boolean(subscriptionId));
      const isPolarSubscription = isLikelyPolarSubscription;
      if (!isPolarProvider || !isPolarSubscription) {
        return paddle.onCurrentPlanChange({
          uid,
          prorate: prorate || "prorated_immediately",
          subscriptionId: subscriptionId || "",
          lookupKey: lookupKey || "",
        });
      }

      setSubscriptionSessionLoading(true);
      try {
        await axios.post(resolveUrl("changePolarPlan"), {
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
    [paddle]
  );

  const onOpenPortal = useCallback(
    async ({ uid }: { uid: string }) => {
      if (!isPolarProvider || !uid) return;
      setSubscriptionSessionLoading(true);
      try {
        const { data } = await axios.post(resolveUrl("createPolarPortalSession"), {
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
      const isLikelyPolarUser =
        subscriptionSource?.provider === "polar" ||
        (isPolarProvider &&
          !subscriptionSource?.provider &&
          Boolean(subscriptionSource?.subscriptionId));
      const isPolarUser = isLikelyPolarUser;
      if (!isPolarProvider || !isPolarUser) {
        return paddle.onUnsubscribe({ userDetails, user });
      }

      setSubscriptionSessionLoading(true);
      try {
        await axios.post(resolveUrl("cancelPolarSubscription"), {
          uid: user?.uid,
          subscriptionId: subscriptionSource?.subscriptionId,
        });
        location.replace("/settings");
      } finally {
        setSubscriptionSessionLoading(false);
      }
    },
    [paddle]
  );

  return {
    onPaymentIntent,
    onSuccess,
    loading: isPolarProvider ? loading : paddle.loading,
    subscriptionSessionLoading: isPolarProvider ? subscriptionSessionLoading : paddle.subscriptionSessionLoading,
    successComplete: isPolarProvider ? successComplete : paddle.successComplete,
    onCurrentPlanChange,
    onOpenPortal,
    onUnsubscribe,
    retrieveSubscriptionData,
  };
}
