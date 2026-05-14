import React, { useCallback } from "react";
import axios from "axios";
import firebaseService from "../services/firebase.service";
import { getPlanByLookupId } from "../utils/subscriptionPlans";
import { getPaddlePriceId } from "../utils/subscriptionPlans";
import { initializePaddle, Paddle } from "@paddle/paddle-js";

const functionsBaseUrl = (
  import.meta.env.VITE_FUNCTIONS_BASE_URL ||
  `https://us-central1-${import.meta.env.VITE_FIREBASE_PROJECT_ID}.cloudfunctions.net`
).replace(/\/$/, "");
const resolveUrl = (path: string) => `${functionsBaseUrl}/${path}`;

const headers = {
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*",
};
const paddleFailRedirect = "/settings?canceled=true";

export default function usePaddle() {
  // Stripe states
  const [loading, setLoading] = React.useState<boolean>(false);

  const [subscriptionSessionLoading, setSubscriptionSessionLoading] =
    React.useState<boolean>(false);
  const [successComplete, setSuccessComplete] = React.useState<boolean>(false);
  const paddleTokenId = import.meta.env.VITE_PADDLE_CLIENT_KEY;

  const onPaymentIntent = useCallback(
    ({ lookupKey, navigate }: { lookupKey: string; navigate: any }) => {
      setLoading(true);
      const priceId = getPaddlePriceId(lookupKey);

      if (!priceId) {
        console.error(
          `Missing Paddle price id for plan "${lookupKey}". Add VITE_PADDLE_PRICE_* env vars.`
        );
        setLoading(false);
        navigate("/settings?canceled=true");
        return;
      }

      // Download and initialize Paddle instance from CDN
      initializePaddle({
        token: `${paddleTokenId}`,
        pwCustomer: {},
        environment: import.meta.env.VITE_PADDLE_ENVIRONMENT,
        eventCallback: function (data) {
          if (data.name == "checkout.completed") {
            const {
              // @ts-ignore
              data: { transaction_id },
            } = data;
            return navigate("/success/?success=true", {
              state: {
                txnId: transaction_id,
                priceId: lookupKey,
              },
            });
          }
        },
      }).then((paddle: Paddle | undefined) => {
        if (paddle) {
          paddle?.Checkout.open({
            items: [{ priceId, quantity: 1 }],
          });
        }
      });
    },
    []
  );

  const onSuccess = React.useCallback(
    async ({
      uid,
      txnId,
      lookupKey,
    }: {
      uid: string;
      txnId: string;
      lookupKey: string;
    }) => {
      if (!uid || !txnId || !lookupKey) {
        location.replace(paddleFailRedirect);
        return;
      }

      return firebaseService
        .getDocument(`users/${uid}`)
        .then(async () => {
          const res = await retrieveTransactionData({ txnId });
          if (!res?.subscription_id) {
            throw new Error("Missing Paddle subscription id on transaction");
          }

          const planData = getPlanByLookupId(lookupKey);
          // Update firebase with new user subscription
          await firebaseService.updateDocument("users", uid, {
            subscription: {
              ...planData,
              status: "active",
              transactionId: txnId,
              renews: true,
              subscriptionId: res.subscription_id,
              provider: "paddle",
            },
            // subscriptionHistory: updateSubscription,
          });

          setSuccessComplete(true);
          setTimeout(() => {
            location.replace("/dashboard");
          }, 3000);
        })
        .catch((err) => {
          console.error("Paddle checkout confirmation failed", err);
          location.replace(paddleFailRedirect);
        });
    },
    []
  );

  const retrieveTransactionData = React.useCallback(
    async ({ txnId }: { txnId: string }) => {
      return await axios
        .get(resolveUrl("retrieveTransactionData"), {
          params: {
            txnId,
          },
          headers: headers,
        })
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.error("Failed to retrieve Paddle transaction", error);
          throw error;
        });
    },
    []
  );

  const retrieveSubscriptionData = React.useCallback(
    async ({ subscriptionId }: { subscriptionId: string }) => {
      if (!subscriptionId) {
        return null;
      }

      return await axios
        .get(resolveUrl("retrieveCurrentSubscription"), {
          params: {
            subscriptionId,
          },
          headers: headers,
        })
        .then((res) => {
          return res.data;
        })
        .catch((error) => {
          console.error("Failed to retrieve Paddle subscription", error);
          throw error;
        });
    },
    []
  );

  const onCurrentPlanChange = React.useCallback(
    async ({
      prorate,
      subscriptionId,
      lookupKey,
      uid,
    }: {
      prorate: string;
      subscriptionId: string;
      lookupKey: string;
      uid: string;
    }) => {
      setSubscriptionSessionLoading(true);
      const planData = getPlanByLookupId(lookupKey);
      const priceId = getPaddlePriceId(lookupKey);
      return await axios
        .get(resolveUrl("currentPlanChange"), {
          params: {
            prorate,
            subscriptionId,
            lookupKey,
            priceId,
            uid,
            planUpdate: {
              ...planData,
            },
          }
          ,
          headers: headers,
        })
        .then(() => {
          location.reload();
        })
        .catch((error) => {
          console.log(error);
        });
    },
    []
  );

  const onUnsubscribe = React.useCallback(
    async ({ userDetails, user }: { userDetails: any; user: any }) => {
      setSubscriptionSessionLoading(true);
      return await axios
        .get(resolveUrl("unsubscribeFromPlan"), {
          params: {
            subscriptionId: userDetails?.subscription?.subscriptionId,
            userId: user.uid,
          },
          headers: {
            "Access-Control-Allow-Headers": "*",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods": "*",
          },
        })
        .then(() => {
          location.replace("/settings");
        })
        .catch((error) => {
          console.log(error);
        })
        .finally(() => {
          setSubscriptionSessionLoading(false);
        });
    },
    []
  );

  return React.useMemo(
    () => ({
      onPaymentIntent,
      onSuccess,
      loading,
      subscriptionSessionLoading,
      successComplete,
      onCurrentPlanChange,
      onUnsubscribe,
      retrieveSubscriptionData,
    }),
    [
      onPaymentIntent,
      onSuccess,
      loading,
      subscriptionSessionLoading,
      successComplete,
      onCurrentPlanChange,
      onUnsubscribe,
      retrieveSubscriptionData,
    ]
  );
}
