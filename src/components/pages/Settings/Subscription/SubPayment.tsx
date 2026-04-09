import React from "react";
import useBilling from "@root/src/hooks/useBilling";
import { Loader } from "@components/Loader";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "@root/src/context/AuthContext";

export const SubPayment = ({ plan }: { plan: any }) => {
  const navigate = useNavigate();
  const { user, userDetails } = useAuthContext();

  // Handle billing checkout
  const { onPaymentIntent } = useBilling();

  React.useEffect(() => {
    onPaymentIntent({
      lookupKey: plan?.lookupId,
      navigate,
      uid: user?.uid,
      email: userDetails?.email,
      customerName: userDetails?.fullName,
    });
  }, []);

  return (
    <div className="p-[20px] text-center font-medium text-[15px] rounded-[24px] w-2/4 flex flex-col gap-10 mx-auto my-[64px]">
      <Loader compact />
    </div>
  );
};
