import { Link, useNavigate } from "react-router-dom";
import logo from "@assets/ecom-logo.png";
import { useLanguageContext } from "../context/LanguageContext";
import styled from "styled-components";
import { Button } from ".";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Key } from "react";
import { useWindowSize } from "usehooks-ts";
import { MobileHeader } from "./MobileHeader";
import { useAuthContext } from "../context/AuthContext";

const HeaderWrapper = styled.nav`
  display: flex;
  margin: auto;
  justify-content: space-between;
  align-items: center;
  height: 80px;
  position: relative;
  z-index: 10;
  @media screen and (max-width: 1023px) {
    margin: auto 24px;
  }
`;

const items = [
  {
    item: (
      <img
        src={logo}
        width={150}
        className="relative left-[-10px] top-1"
        alt="ecomspy logo"
      />
    ),
    link: "/",
  },
  { item: { en: "Home", fr: "Accueil" }, link: "/" },
  { item: { en: "Plans", fr: "Plans" }, link: "/plans" },
  { item: { en: "FAQ", fr: "FAQ" }, link: "/faq" },
];

export const Header = () => {
  const { lan } = useLanguageContext();
  const navigate = useNavigate();
  const { width = 0 } = useWindowSize();
  const { user, logout } = useAuthContext();

  // Button text & action when authenticated
  const authText = user ? logoutText[lan] : loginText[lan];
  const actionButton = user ? dashboardText[lan] : startedText[lan];
  const handleAuth = () => {
    if (user) {
      logout();
    } else {
      navigate("/login");
    }
  };
  const handleAction = () => {
    if (user) {
      navigate("/dashboard");
    } else {
      navigate("/plans");
    }
  };

  if (width < 1024) {
    return <MobileHeader />;
  }

  return (
    <HeaderWrapper>
      <div className="flex gap-[36px] items-center">
        {items.map((i: any, k: Key) => (
          <Link key={k} to={i.link}>
            <div className="text-[14px] text-[#FFFFFFB8]">
              {i.item[lan] ? i.item[lan] : i.item}
            </div>
          </Link>
        ))}
      </div>
      <div className="flex gap-[24px] items-center">
        <Button
          backgroundColor="transparent"
          border="2px solid #FFFFFF1A"
          text={authText}
          action={handleAuth}
        />
        <Button text={actionButton} action={handleAction} />
        <LanguageSwitcher />
      </div>
    </HeaderWrapper>
  );
};

const startedText: any = {
  en: "Get Started",
  fr: "Commencer",
};
const loginText: any = {
  en: "Log in",
  fr: "se connecter",
};
const logoutText: any = {
  en: "Log out",
  fr: "Se déconnecter",
};
const dashboardText: any = {
  en: "Dasboard",
  fr: "Tableau De Bord",
};
