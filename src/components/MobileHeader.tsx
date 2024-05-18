import { Link, useNavigate } from "react-router-dom";
import logo from "@assets/ecom-logo.png";
import { useLanguageContext } from "../context/LanguageContext";
import styled from "styled-components";
import { Button } from ".";
import { LanguageSwitcher } from "./LanguageSwitcher";
import React, { Key } from "react";
import { PiList } from "react-icons/pi";
import { IoMdClose as Close } from "react-icons/io";
import { useAuthContext } from "../context/AuthContext";

const HeaderWrapper = styled.nav`
  margin: auto;
  min-height: 100vh;
  width: 100%;
  position: fixed;
  background-color: #0b0e22;
  z-index: 1000;
  inset: 0;
  display: flex;
  flex-direction: column;
  padding: 16px 32px 16px;
  overflow-y: scroll;
`;

const items: any = [
  {
    item: (
      <img
        src={logo}
        width={125}
        className="relative left-[-10px] top-[4px]"
        alt="ecomspy logo"
      />
    ),
    link: "/",
  },
  { item: { en: "Home", fr: "Accueil" }, link: "/" },
  { item: { en: "Plans", fr: "Plans" }, link: "/plans" },
  { item: { en: "FAQ", fr: "FAQ" }, link: "/faq" },
];

export const MobileHeader = () => {
  const { lan } = useLanguageContext();
  const navigate = useNavigate();

  const [open, setOpen] = React.useState<boolean>(false);

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

  React.useEffect(() => {
    const updateDocument = (style: string) => {
      document.body.style.overflow = style;
    };
    if (open) {
      updateDocument("hidden");
    } else {
      updateDocument("auto");
    }
  }, [open]);

  return (
    <>
      <div className="flex py-3 justify-between items-center relative z-10">
        <Link to={"/"}>{items[0].item}</Link>
        <div className="flex gap-3 items-center">
          <Button text={actionButton} action={handleAction} />
          <div
            onClick={() => setOpen(true)}
            className="p-2 border-2 border-[#FFFFFF1A] rounded-[8px] cursor-pointer"
          >
            <PiList fontSize={16} />
          </div>
        </div>
      </div>
      {open && (
        <HeaderWrapper>
          <div className="flex justify-end relative right-[-4px] top-[10px]">
            <Close
              className="mb-8 mt-4 cursor-pointer"
              fontWeight={600}
              fontSize={32}
              onClick={() => setOpen(false)}
            />
          </div>
          {items
            .map((i: any, k: Key) => (
              <Link key={k} to={i.link} className="w-max">
                <div className="text-xl font-medium mb-8">
                  {i.item[lan] ? i.item[lan] : i.item}
                </div>
              </Link>
            ))
            .slice(1)}
          <div className="ml-[-16px] flex w-full justify-between items-center">
            <Button
              backgroundColor="transparent"
              border="none"
              text={authText}
              size="large"
              action={handleAuth}
            />
            <div>
              <LanguageSwitcher />
            </div>
          </div>
        </HeaderWrapper>
      )}
    </>
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
