import React from "react";
import { Button } from "@components/Button";
import { AuthWrapper, InputWrapper } from "@components/pages/Auth";
import { LandingLayout } from "../../components/layout/LandingLayout";
import { useLanguageContext } from "@root/src/context/LanguageContext";
import { useAuthContext } from "@root/src/context/AuthContext";
import { validationForm } from "@root/src/utils/functions";
import { Confirmation } from "@components/Confirmation";

export const ForgotPassword = () => {
  const { lan } = useLanguageContext();
  const { forgotPassword } = useAuthContext();

  const [email, setEmail] = React.useState<string>("");
  const [confirmEmail, setConfirmEmail] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);

  const handleReset = () => {
    forgotPassword(email)
      .then(() => {
        setOpen(true);
        setConfirmEmail(email);
      })
      .catch(() => {
        setError(errorText[lan]);
      })
      .finally(() => {
        setEmail("");
        setError("");
      });
  };
  let validation = validationForm({
    email: email,
  });

  return (
    <LandingLayout>
      {open && (
        <Confirmation
          handleClose={() => setOpen(false)}
          title={successSubtext[lan]}
          text={successText[lan] + ` ${confirmEmail}. \n` + spamText[lan]}
        />
      )}
      <AuthWrapper>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl font-medium">{title[lan]}</p>
          <p className="text-[15px] font-light text-[#FFFFFFA3] max-w-[300px]">
            {subtitle[lan]}
          </p>
        </div>
        <div className="text-left w-full flex flex-col gap-2">
          <span className="text-xs font-light">{googleText[lan]}</span>
          <InputWrapper
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            placeholder="example@email.com"
          />
        </div>
        <Button
          disable={!email.length || validation.err}
          text={buttonText[lan]}
          size="large"
          full
          action={handleReset}
        />
        {!!error.length && (
          <p className="text-left text-xs text-[#F96E46]">{error || "Monee"}</p>
        )}
      </AuthWrapper>
    </LandingLayout>
  );
};

const title: any = {
  en: "Reset your Password",
  fr: "Réinitialiser votre mot de passe",
};
const subtitle: any = {
  en: "Enter your registered email to reset your password",
  fr: "Entrez votre email enregistré pour réinitialiser votre mot de passe",
};
const googleText: any = {
  en: "Email address",
  fr: "Adresse e-mail",
};
const buttonText: any = {
  en: "Reset",
  fr: "Réinitialiser",
};
const successSubtext: any = {
  en: "Email sent",
  fr: "Email envoyé",
};
const successText: any = {
  en: "A reset password request has been sent to",
  fr: "Une demande de réinitialisation du mot de passe a été envoyée à  ",
};
const spamText: any = {
  en: "Please check your inbox and spam.",
  fr: "Veuillez vérifier votre boîte de réception ou vos spams.",
};
const errorText: any = {
  en: "Reset email not sent. Please try again.",
  fr: "E-mail de réinitialisation non envoyé. Veuillez réessayer.",
}