import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@components/Button";
import { AuthWrapper, InputWrapper } from "@components/pages/Auth";
import { LandingLayout } from "../../components/layout/LandingLayout";
import { useLanguageContext } from "@root/src/context/LanguageContext";
import brand from "@assets/images/brand.png";
import { useAuthContext } from "@root/src/context/AuthContext";
import { validationForm } from "@root/src/utils/functions";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";

export const Login = () => {
  const { lan } = useLanguageContext();
  const { login, user, setError, loading, loginWithGoogle } = useAuthContext();

  const [showPassword, setShowPassword] = React.useState<boolean>(false);
  const [email, setEmail] = React.useState<string>("");
  const [password, setPassword] = React.useState<string>("");
  const [err, setErr] = React.useState<string>("");
  let validation = validationForm({
    email: email,
    password: password,
  });

  const handleLogin = () => {
    if (validation.err) {
      setError(validation);
      setErr(validation.msg);
    } else {
      setError("");
      login({ userData: { email, password } })
        .then(() => {
          setEmail("");
          setPassword("");
        })
        .catch((err: any) => {
          setErr(errCode(err.code));
        });
    }
  };
  React.useEffect(() => {
    setError("");
  }, []);

  // Navigate to home if user is already logged in
  const navigate = useNavigate();
  React.useMemo(() => {
    user && navigate("/dashboard");
  }, [user]);

  return (
    <LandingLayout>
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
          <Link className="w-max" to={"/forgot-password"}>
            <p className="text-xs underline font-light">{forgotText[lan]}</p>
          </Link>
        </div>
        <div className="w-full text-left">
          <Button
            loading={loading}
            text={loginText[lan]}
            size="large"
            full
            action={handleLogin}
          />
          <Link className="w-max" to={"/register"}>
            <p className="text-xs underline font-light mt-2">
              {registerText[lan]}
            </p>
          </Link>
          {!!err.length && (
            <p className="text-left text-xs text-[#F96E46]">{err}</p>
          )}
        </div>
      </AuthWrapper>
    </LandingLayout>
  );
};

const title: any = {
  en: "Welcome to Ecomspy",
  fr: "Bienvenue chez Ecomspy",
};
const subtitle: any = {
  en: "Sign in with Google or your email address",
  fr: "Connectez-vous avec Google ou votre adresse e-mail",
};
const googleText: any = {
  en: "Continue with Google",
  fr: "Continuer avec Google",
};
const emailText: any = {
  en: "Email address",
  fr: "Adresse e-mail",
};
const passwordText: any = {
  en: "Password",
  fr: "Mot de passe",
};
const forgotText: any = {
  en: "Forgot password?",
  fr: "Mot de passe oublié?",
};
const loginText: any = {
  en: "Log in",
  fr: "se connecter",
};
const registerText: any = {
  en: "Dont have an account? Register",
  fr: "Vous n'avez pas de compte? Inscrivez-vous",
};

const errCode = (code: string) => {
  switch (code) {
    case "auth/invalid-credential":
      return "The user/password is credential";
    case "auth/invalid-email":
      return "The user/password is credential";
    case "auth/user-disabled":
      return "The user has been disabled";
    case "auth/user-not-found":
      return "The user is not found";
    case "auth/wrong-password":
      return "Wrong password. Please try again";
    case "auth/missing-password":
      return "Wrong password. Please try again";
    default:
      return "Invalid login action";
  }
};
