import React from "react";
import { Button } from "@components/Button";
import { AuthWrapper, InputWrapper } from "@components/pages/Auth";
import { LandingLayout } from "../../components/layout/LandingLayout";
import { useLanguageContext } from "@root/src/context/LanguageContext";
import brand from "@assets/images/brand.png";
import { useAuthContext } from "@root/src/context/AuthContext";
import { validationForm } from "@root/src/utils/functions";
import { useLocation, useNavigate } from "react-router-dom";
import { Confirmation } from "@components/index";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";

export const Register = () => {
  const { lan } = useLanguageContext();
  const { register, error, setError, loading, user, loginWithGoogle } =
    useAuthContext();

  const [fName, setFName] = React.useState<string>("");
  const [lName, setLName] = React.useState<string>("");
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [confirm, setConfirm] = React.useState<string>("");
  const [checked, setChecked] = React.useState<boolean>(false);
  const [showPassword, setShowPassword] = React.useState<boolean>(false);

  // Confirmation model
  const [success, setSuccess] = React.useState<boolean>(false);

  let validation = validationForm({
    fName: fName,
    lName: lName,
    email: email,
    password: password,
    compare: confirm,
    register,
  });

  const handleRegister = () => {
    if (validation.err) {
      setError(validation);
    } else {
      setError("");

      let userData = {
        fullName: `${fName} ${lName}`,
        email,
        password,
        subscription: 0,
        createdAt: Date.now(),
        uicon: Math.floor(Math.random() * (5 - 1 + 1) + 1),
      };
      register({ userData }).then((res: { result: string }) => {
        if (res.result === "success") {
          navigate("/dashboard");
        }
      });
    }
  };
  React.useEffect(() => {
    setError("");
  }, []);

  // Navigate to home if user is already logged in
  const location = useLocation();
  const navigate = useNavigate();
  React.useEffect(() => {
    if (user) {
      return location.state?.tab === "subscription"
        ? navigate("/settings", { state: { tab: "subscription" } })
        : navigate("/dashboard");
    }
  }, [user]);

  return (
    <LandingLayout>
      {success && (
        <Confirmation
          handleClose={() => setSuccess(false)}
          title={successTitle[lan]}
          text={successText[lan]}
        />
      )}
      <AuthWrapper>
        <div className="flex flex-col items-center gap-2">
          <p className="text-2xl font-medium">{title[lan]}</p>
          <p className="text-[15px] font-light text-[#FFFFFFA3] max-w-[200px]">
            {subtitle[lan]}
          </p>
        </div>
        <Button
          full
          text={googleText[lan]}
          size="large"
          backgroundColor="#FFFFFF0A"
          iconBefore={<img src={brand} width={16} />}
          action={loginWithGoogle}
        />
        <div className="flex w-full items-center gap-3">
          <hr className="w-full border-0 border-t-[1px] border-[#FFFFFF1F]" />
          <p className="uppercase text-sm py-2 px-3 rounded-[100px] border-[1px] border-[#FFFFFF1F]">
            or
          </p>
          <hr className="w-full border-0 border-t-[1px] border-[#FFFFFF1F]" />
        </div>
        <div className="text-left w-full flex flex-col gap-2">
          <span className="text-xs font-light">{fnameText[lan]}</span>
          <InputWrapper
            onChange={(e) => setFName(e.target.value)}
            placeholder={fnameText[lan]}
          />
        </div>
        <div className="text-left w-full flex flex-col gap-2">
          <span className="text-xs font-light">{lnameText[lan]}</span>
          <InputWrapper
            onChange={(e) => setLName(e.target.value)}
            placeholder={lnameText[lan]}
          />
        </div>
        <div className="text-left w-full flex flex-col gap-2">
          <span className="text-xs font-light">{emailText[lan]}</span>
          <InputWrapper
            onChange={(e) => setEmail(e.target.value)}
            placeholder="example@email.com"
          />
        </div>
        <div className="text-left w-full flex flex-col gap-2 relative">
          <span className="text-xs font-light">{passwordText[lan]}</span>
          <InputWrapper
            type={showPassword ? "text" : "password"}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="··············"
          />
          <div className="right-0 top-[38px] mr-2 absolute cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <PiEyeLight /> : <PiEyeSlash />}
          </div>
        </div>
        <div className="text-left w-full flex flex-col gap-2 relative">
          <span className="text-xs font-light">{confirmText[lan]}</span>
          <InputWrapper
            type={showPassword ? "text" : "password"}
            onChange={(e) => setConfirm(e.target.value)}
            placeholder="··············"
          />
          <div className="right-0 top-[38px] mr-2 absolute cursor-pointer" onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? <PiEyeLight /> : <PiEyeSlash />}
          </div>
        </div>
        <div className="flex gap-2">
          <input
            onClick={() => setChecked(!checked)}
            checked={checked}
            type="checkbox"
            className="cursor-pointer"
          />
          <p className="text-sm text-[#FFFFFF66]">
            I have read and acccept the{" "}
            <a className="underline" href="/privacy" target="_blank">
              Privacy Policy
            </a>{" "}
            &{" "}
            <a className="underline" target="_blank" href="/terms">
              Terms Of Use
            </a>
          </p>
        </div>
        <div className="w-full">
          <Button
            loading={loading}
            text={registerText[lan]}
            size="large"
            full
            action={handleRegister}
            disable={!checked}
          />
          {error && (
            <p className="text-left text-xs text-[#F96E46] whitespace-pre-line">
              {error.msg}
            </p>
          )}
        </div>
      </AuthWrapper>
    </LandingLayout>
  );
};

const title: any = {
  en: "Create your account",
  fr: "Créez votre compte",
};
const subtitle: any = {
  en: "Sign up with Google or your email address",
  fr: "Inscrivez-vous avec Google ou votre adresse e-mail",
};
const googleText: any = {
  en: "Register with Google",
  fr: "Inscrivez-vous avec Google",
};
const fnameText: any = {
  en: "First name",
  fr: "Prénom",
};
const lnameText: any = {
  en: "Last name",
  fr: "Nom de famille",
};
const emailText: any = {
  en: "Email address",
  fr: "Adresse e-mail",
};
const passwordText: any = {
  en: "Password",
  fr: "Mot de passe",
};
const confirmText: any = {
  en: "Confirm Password",
  fr: "Confirmer le mot de passe",
};
const registerText: any = {
  en: "Register",
  fr: "Enregistrer",
};
const successTitle: any = {
  en: "Account created",
  fr: "Compte créé",
};
const successText: any = {
  en: "Your account has been successfully created",
  fr: "Votre compte à été créé avec succès",
};
