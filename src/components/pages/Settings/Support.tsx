import React, { FormEvent } from "react";
import { formSubmit } from "@root/src/utils/functions";
import styled from "styled-components";
import { useLanguageContext } from "@/context/LanguageContext";
import { PiEnvelope, PiPhoneDisconnect } from "react-icons/pi";
import { Button } from "@components/Button";
import { useAuthContext } from "@root/src/context/AuthContext";
import { Confirmation } from "@components/Confirmation";

const Wrapper = styled.div`
  gap: 24px;
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  overflow: clip;
  overflow-y: scroll;
  align-content: flex-start;
  @media screen and (max-width: 479px) {
    margin-bottom: 80px;
    padding: 16px;
  }
`;

export const InputWrapper = styled.textarea<{
  $error?: boolean;
}>`
  width: calc(100% - 2px);
  margin: 1px;
  padding: 12px;
  border-radius: 4px;
  background: #ffffff0a;
  border: 1px solid #ffffff08;
  font-size: 15px;
  font-weight: 400;
  color: rgba(255, 255, 255, 0.64);
  min-height: 103px;
  max-height: 206px;
  outline: ${(props) => (props.$error ? "1px solid #f96e4687" : "none")};
  &::placeholder {
    color: rgba(255, 255, 255, 0.2);
  }
`;

export const Support = () => {
  const { lan } = useLanguageContext();
  const { user } = useAuthContext();

  const [message, setMessage] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event?.preventDefault();
    if (message.length < 10) {
      return setError(shortError[lan]);
    }

    const formData = {
      email: user?.email,
      name: user?.displayName,
      message,
    };

    formSubmit({ formData, formName: "support" })
      .then(() => {
        setOpen(true);
        setMessage("");
        setError("");
      })
      .catch(() => {
        setError(submitError[lan]);
      });
  };

  React.useEffect(() => {
    setError("");
  }, [message]);

  return (
    <Wrapper>
      {open && (
        <Confirmation
          handleClose={() => setOpen(false)}
          text={confirmationText[lan]}
          title={confirmationTitle[lan]}
        />
      )}
      <div>
        <p className="text-xl sm:text-2xl mb-2">{headerText[lan]}</p>
      </div>
      <div className="flex w-full gap-8">
        <a
          href="mailto:support@goecomspy.com"
          className="border-[1px] flex flex-col sm:flex-row items-center gap-2 w-full rounded-[8px]
        justify-center bg-[#FFFFFF0A] border-[#FFFFFF08] py-[14px] text-[10px] sm:text-sm"
        >
          <PiEnvelope />
          support@goecomspy.com
        </a>
        <a
          href="tel:8165219492"
          className="border-[1px] flex flex-col sm:flex-row items-center gap-2 w-full rounded-[8px]
        justify-center bg-[#FFFFFF0A] border-[#FFFFFF08] py-[14px] text-[10px] sm:text-sm"
        >
          <PiPhoneDisconnect />
          (816) 521 9492
        </a>
      </div>
      <div className="flex w-full items-center gap-3">
        <hr className="w-full border-0 border-t-[1px] border-[#FFFFFF1F]" />
        <p
          className="whitespace-pre uppercase w-1/2 text-center text-[10px]
        sm:text-sm py-2 px-3 rounded-[100px] border-[1px] border-[#FFFFFF1F]"
        >
          {orText[lan]}
        </p>
        <hr className="w-full border-0 border-t-[1px] border-[#FFFFFF1F]" />
      </div>
      <form
        className="relative"
        name="support"
        method="post"
        data-netlify="true"
      >
        <input type="hidden" name="form-name" value="support" />
        <p className="mb-2 font-light text-sm">Message</p>
        <InputWrapper
          onChange={(e) => setMessage(e.target.value)}
          rows={8}
          value={message}
          maxLength={1000}
          placeholder={typeText[lan]}
          $error={error.length > 0}
        />
        <p className="ml-auto w-max text-sm">{message.length}/1000</p>
        {error && (
          <p className="bottom-[-20px] w-screen absolute text-left text-xs text-[#F96E46]">
            {error}
          </p>
        )}
      </form>
      <div className="mt-auto ml-auto mb-2 mr-2">
        <Button action={(e) => handleSubmit(e)} text={buttonText[lan]} />
      </div>
    </Wrapper>
  );
};

const headerText: any = {
  en: "Contact Support",
  fr: "Contactez le support",
};
const orText: any = {
  en: "OR SEND A MESSAGE",
  fr: "OU ENVOYER UN MESSAGE",
};
const typeText: any = {
  en: "Type here...",
  fr: "Écrivez ici...",
};
const buttonText: any = {
  en: "Send message",
  fr: "Envoyer le message",
};
const shortError: any = {
  en: "Message description is too short",
  fr: "La description du message est trop courte",
};
const submitError: any = {
  en: "Something went wrong. Please refresh and try again",
  fr: "Quelque chose s'est mal passé. Veuillez actualiser et réessayer",
};
const confirmationText: any = {
  en: "Our support team will get back to you shortly",
  fr: "Notre équipe d'assistance vous répondra sous peu",
};
const confirmationTitle: any = {
  en: "Message sent",
  fr: "Message envoyé",
};
