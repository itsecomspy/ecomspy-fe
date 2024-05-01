import React from "react";
import { Loader } from "@components/Loader";
// @ts-ignore
import { Checkmark } from "react-checkmark";
import useStripe from "@root/src/hooks/useStripe";
import { useSearchParams } from "react-router-dom";
import { useAuthContext } from "@root/src/context/AuthContext";

export const SubsciptionSuccess = () => {
  const { onSuccess, successComplete } = useStripe();
  const [params] = useSearchParams();
  const { user } = useAuthContext();

  let lookupId = params.get("lookup_key") || "";
  let sessionId = params.get("session_id") || "";

  React.useEffect(() => {
    if (user?.uid) {
      let uid = user.uid;
      onSuccess({ uid, lookupId, sessionId });
    }
  }, [user]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {successComplete ? <Checkmark color="#3A44E4" size="100" /> : <Loader />}
    </div>
  );
};