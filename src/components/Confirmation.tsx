import styled from "styled-components";
import { PiCheckCircle } from "react-icons/pi";
import React from "react";

const ConfirmationWrapper = styled.div<{
  $error?: boolean;
}>`
  position: fixed;
  right: 0;
  top: 0;
  margin: 24px;
  display: flex;
  width: max-content;
  padding: 16px;
  justify-content: center;
  align-items: flex-start;
  gap: 8px;
  z-index: 1000;
  cursor: pointer;
  border-radius: 8px;
  background: ${(props) => (props.$error ? "#F96E46" : "#2d55fb")};
`;

export const Confirmation = ({
  title,
  text,
  handleClose,
  action,
  error,
}: {
  text: string;
  title: string;
  handleClose: () => void;
  action?: () => void;
  error?: boolean;
}) => {
  const handleClick = () => {
    if (action) {
      action();
    }
    handleClose();
  };

  React.useEffect(() => {
    setTimeout(() => {
      if (action) {
        action();
      }
      handleClose();
    }, 5000);
  }, []);

  return (
    <ConfirmationWrapper $error={error} onClick={handleClick}>
      <PiCheckCircle className="relative top-[2px]" fontSize={16} />
      <div>
        <p className="font-medium text-[15px] text-white">{title}</p>
        <p className="whitespace-pre text-xs text-[#FFFFFFB8]">{text}</p>
      </div>
    </ConfirmationWrapper>
  );
};
