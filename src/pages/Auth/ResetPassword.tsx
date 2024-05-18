import React from "react";
import { Button } from "@components/Button";
import { AuthWrapper, InputWrapper } from "@components/pages/Auth";
import { LandingLayout } from "../../components/layout/LandingLayout";
import { useLanguageContext } from "@root/src/context/LanguageContext";
import { useAuthContext } from "@root/src/context/AuthContext";
import { validationForm } from "@root/src/utils/functions";
import { Confirmation } from "@components/Confirmation";
import { useNavigate, useSearchParams } from "react-router-dom";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";

export const ResetPassword = () => {
  const { lan } = useLanguageContext();
  const { resetPassword } = useAuthContext();

  const [newPassword, setPassword] = React.useState<string>("");
  const [error, setError] = React.useState<string>("");
  const [open, setOpen] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  const [searchParams] = useSearchParams();
  const code = searchParams.get("oobCode");

  const navigate = useNavigate();

  const handleReset = () => {
    resetPassword(code, newPassword)
      .then(() => {
        setOpen(true);
        setPassword("");
        setError("");
      })
      .catch((err: any) => {
        setError(errCode(err.code));
      });
  };
  let validation = validationForm({
    password: newPassword,
    register: true,
  });

  return (
    <LandingLayout>
      {open && (
        <Confirmation
          handleClose={() => setOpen(false)}
          action={() => navigate("/login")}
          title={successSubtext[lan]}
          text={successText[lan]}
        />
      )}
      <AuthWrapper>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl font-medium">{title[lan]}</p>
          <p className="text-[15px] font-light text-[#FFFFFFA3] max-w-[300px]">
            {subtitle[lan]}
          </p>
        </div>
        <div className="text-left w-full flex flex-col gap-2 relative">
          <span className="text-xs font-light">{googleText[lan]}</span>
          <InputWrapper
            type={showPassword ? "text" : "password"}
            value={newPassword}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="··············"
          />
          <div
            className="right-0 top-[38px] mr-2 absolute cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <PiEyeLight /> : <PiEyeSlash />}
          </div>
        </div>
        <Button
          disable={!newPassword.length || validation.err}
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
  en: "Enter your new password",
  fr: "Entrez votre nouveau mot de passe",
};
const googleText: any = {
  en: "Password",
  fr: "Mot de passe",
};
const buttonText: any = {
  en: "Confirm",
  fr: "Confirmer",
};
const successSubtext: any = {
  en: "Password Changed",
  fr: "Mot de passe changé",
};
const successText: any = {
  en: "Your password has been successfully changed.",
  fr: "Votre mot de passe a été changé avec succès",
};

const errCode = (code: string) => {
  switch (code) {
    case "auth/expired-action-code":
      return "Expired code";
    case "auth/invalid-action-code":
      return "Invalid code action";
    case "auth/user-disabled":
      return "The user has been disabled";
    case "auth/user-not-found":
      return "The user is not found";
    case "auth/weak-password":
      return "Please use a strong password";
    default:
      return "Invalid code action";
  }
};
