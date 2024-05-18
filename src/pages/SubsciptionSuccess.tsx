import React from "react";
import { Loader } from "@components/Loader";
// @ts-ignore
import { Checkmark } from "react-checkmark";
import usePaddle from "@root/src/hooks/usePaddle";
import { useLocation } from "react-router-dom";
import { useAuthContext } from "@root/src/context/AuthContext";

export const SubsciptionSuccess = () => {
  const { onSuccess, successComplete } = usePaddle();
  const location = useLocation();
  const { user } = useAuthContext();

  React.useEffect(() => {
    if (user?.uid) {
      let uid = user.uid;
      onSuccess({
        uid,
        txnId: location?.state.txnId,
        lookupKey: location?.state.priceId,
      });
    }
  }, [user]);

  return (
    <div className="h-screen w-screen flex items-center justify-center">
      {successComplete ? <Checkmark color="#3A44E4" size="100" /> : <Loader />}
    </div>
  );
};
