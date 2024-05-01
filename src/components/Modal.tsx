import React from "react";
import { Button, Loader } from ".";
import styled from "styled-components";
import ClickAwayListener from "react-click-away-listener";

const ModalWrapper = styled.div`
  position: fixed;
  inset: 0;
  z-index: 1000;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  width: 100%;
  height: 100%;
  align-items: center;
  justify-content: center;
`;

export const Modal = ({
  close,
  modalConfirmationText,
  cancelButtonText,
  actionText,
  loading,
  action,
}: {
  close: () => void;
  modalConfirmationText: string;
  cancelButtonText: string;
  actionText: string;
  loading: boolean;
  action: () => void;
}) => {
  React.useEffect(() => {
    const updateDocument = (style: string) => {
      document.body.style.overflow = style;
    };
    updateDocument("clip");
    return () => updateDocument("auto");
  }, []);

  return (
    <ModalWrapper>
      <ClickAwayListener onClickAway={close}>
        <div
          className="flex gap-6 flex-col min-h-[150px] bg-[#111427] border-[1px]
        border-[#ffffff17] max-w-[90vw] w-[300px] mx-4 rounded-[16px] pt-8 p-4"
        >
          {loading ? (
            <div className="m-auto">
              <Loader />
            </div>
          ) : (
            <>
              <p className="text-[14px] text-[#FFFFFFB8] font-light px-2">{modalConfirmationText}</p>
              <div className="m-auto mb-0 flex justify-between gap-4">
                <Button
                  backgroundColor="white"
                  color="black"
                  text={cancelButtonText}
                  action={close}
                />
                <Button text={actionText} action={action} />
              </div>
            </>
          )}
        </div>
      </ClickAwayListener>
    </ModalWrapper>
  );
};
