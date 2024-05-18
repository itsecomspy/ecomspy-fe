import React from "react";
import usePaddle from "@root/src/hooks/usePaddle";
import { Loader } from "@components/Loader";
import { useNavigate } from "react-router-dom";

export const SubPayment = ({ plan }: { plan: any }) => {
  const navigate = useNavigate();

  // Handle stripe checkout and payment
  const { onPaymentIntent } = usePaddle();

  React.useEffect(() => {
    onPaymentIntent({ lookupKey: plan?.lookupId, navigate });
  }, []);

  return (
    <div className="p-[20px] text-center font-medium text-[15px] rounded-[24px] w-2/4 flex flex-col gap-10 mx-auto my-[64px]">
      <Loader compact />
    </div>
  );
};
