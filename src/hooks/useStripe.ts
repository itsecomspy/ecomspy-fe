import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import firebaseService from "../services/firebase.service";
import { getPlanByLookupId } from "../utils/subscriptionPlans";
import axios from "axios";

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

let stripePromise: any;
const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);
  }
  return stripePromise;
};

export default function useStripe() {
  // Stripe states
  const [stripeError, setStripeError] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);
  const [subscriptionSessionLoading, setSubscriptionSessionLoading] =
    React.useState<boolean>(false);
  const [successComplete, setSuccessComplete] = React.useState<boolean>(false);

  const setSubscription = async (checkoutOptions: any) => {
    setLoading(true);
    const stripe = await getStripe();
    const { error } = await stripe.redirectToCheckout(checkoutOptions);
    console.log("Stripe checkout error", error);
    if (error) {
      setStripeError(error.message);
    }
    setLoading(false);
  };

  const onPaymentIntent = React.useCallback(
    async ({ lookupKey }: { lookupKey: string }) => {
      return await axios
        .post(resolveUrl("subscribeToPlan"), {
          params: {
            lookupKey,
          },
          headers: headers,
        })
        .then((res) => {
          window.location.href = res.data.url;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    []
  );

  const onSuccess = React.useCallback(
    async ({
      uid,
      lookupId,
      sessionId,
    }: {
      uid: string;
      lookupId: string;
      sessionId: string;
    }) => {
      return firebaseService
        .getDocument(`users/${uid}`)
        .then(async () => {
          let subscriptionData = await retrieveSessionData({ sessionId });

          const planData = getPlanByLookupId(lookupId);
          // Update firebase with new user subscription
          await firebaseService.updateDocument("users", uid, {
            subscription: {
              ...planData,
              status: "active",
              sessionId,
              renews: true,
              subscriptionId: subscriptionData.subscription,
            },
            // subscriptionHistory: updateSubscription,
          });

          setSuccessComplete(true);
          setTimeout(() => {
            location.replace("/dashboard");
          }, 3000);
        })
        .catch((err) => err);
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

  const retrieveSessionData = React.useCallback(
    async ({ sessionId: sessionId }: { sessionId: string }) => {
      return await axios
        .get(resolveUrl("retrieveSessionData"), {
          params: {
            sessionId,
          },
          headers: headers,
        })
        .then((res) => {
          return res.data.session;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    []
  );

  const retreiveSubscription = React.useCallback(
    async ({ subscriptionId: subscriptionId }: { subscriptionId: string }) => {
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
          console.log(error);
        });
    },
    []
  );

  return {
    stripeError,
    loading,
    onSuccess,
    setSubscription,
    onPaymentIntent,
    successComplete,
    onUnsubscribe,
    retreiveSubscription,
    subscriptionSessionLoading,
  };
}
